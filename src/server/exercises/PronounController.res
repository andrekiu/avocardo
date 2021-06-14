open PronounExercises

module Decode = {
  open Json.Decode
  type t = {
    id: int,
    question: string,
    answer: string,
    alternatives: array<string>,
    variant: string,
  }
  let row = (json): t => {
    id: json |> field("id", int),
    question: json |> field("question", string),
    answer: json |> field("answer", string),
    alternatives: json |> field("alternatives", array(string)),
    variant: json |> field("variant", string),
  }
}

let format = ({id, question, answer, alternatives}: Decode.t) => {
  let split = sentence => {
    let firstBlankspace = String.index(sentence, ' ')
    (
      String.sub(sentence, 0, firstBlankspace),
      String.sub(sentence, firstBlankspace + 1, String.length(sentence) - firstBlankspace - 1),
    )
  }

  let dedupe = words => {
    Array.sort(Pervasives.compare, words)
    let rec iterator = (prev, idx, sum) =>
      if idx == Array.length(words) {
        sum
      } else if prev == words[idx] {
        iterator(prev, idx + 1, sum)
      } else {
        iterator(words[idx], idx + 1, list{words[idx], ...sum})
      }
    iterator("", 0, list{})->Array.of_list
  }

  let label = (answer, words) => Array.map(w => w == answer ? Right(w) : Wrong(w), words)

  let transform = (words, right) => dedupe(Array.append(words, [right])) |> label(right)

  let (pronounAnswer, nounAnswer) = split(answer)
  let components = Array.map(split, alternatives)
  {
    id: id,
    quiz: question,
    pronouns: transform(Array.map(fst, components), pronounAnswer),
    nouns: transform(Array.map(snd, components), nounAnswer),
  }
}

let randomQuestion = {
  open Requery.QueryBuilder
  () =>
    select(
      list{
        e(tcol(tname("quizzes"), cname("id"))),
        e(tcol(tname("quizzes"), cname("question"))),
        e(tcol(tname("quizzes"), cname("answer"))),
        e(tcol(tname("quizzes"), cname("alternatives"))),
        e(tcol(tname("quizzes"), cname("variant"))),
      } |> from(tableNamed("quizzes")),
    ) |> orderBy1(call(fname("RAND"), list{}), asc)
}

let genQuizzes = ids => {
  let inStatement = String.concat(", ", Array.to_list(ids))
  let query = `
    select id, question, answer, alternatives 
    from quizzes 
    where id in (${inStatement})
  `
  Js.Promise.make((~resolve, ~reject) =>
    DB.withConnection(conn =>
      MySql2.execute(conn, query, None, msg => {
        switch msg {
        | #Error(e) => reject(. MySql2.Exn.toExn(e))
        | #Select(select) => resolve(. MySql2.Select.rows(select))
        | #Mutation(_) => reject(. Failure("UNEXPECTED_MUTATION"))
        }
      })
    )
  )
}

let genFailures = fingerprint => {
  Js.Promise.make((~resolve, ~reject) =>
    DB.withConnection(conn =>
      MySql2.execute(
        conn,
        ` select distinct incorrect_answers.question_id as question_id
          from (
            select question_id, assesment 
            from answers 
            where 
              fingerprint = "${fingerprint}"
              and assesment='INCORRECT'
          ) AS incorrect_answers 
          left join (
          select distinct question_id, assesment 
            from answers 
            where 
              fingerprint = "${fingerprint}" 
              and assesment='CORRECT' 
          ) as correct_answers
          on incorrect_answers.question_id = correct_answers.question_id
          where correct_answers.assesment is NULL`,
        None,
        msg => {
          switch msg {
          | #Error(e) => reject(. MySql2.Exn.toExn(e))
          | #Select(select) => resolve(. MySql2.Select.rows(select))
          | #Mutation(_) => reject(. Failure("UNEXPECTED_MUTATION"))
          }
        },
      )
    )
  )
}

let genPronounExercise = () =>
  Js.Promise.make((~resolve, ~reject) =>
    DB.withConnection(conn =>
      MySql2.execute(conn, randomQuestion() |> Requery.RenderQuery.Default.select, None, msg =>
        switch msg {
        | #Error(e) => reject(. MySql2.Exn.toExn(e))
        | #Select(select) => resolve(. MySql2.Select.rows(select)[0] |> Decode.row)
        | #Mutation(_) => reject(. Failure("UNEXPECTED_MUTATION"))
        }
      )
    )
  )
