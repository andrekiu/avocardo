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
        `
        select distinct incorrect_answers.question_id as question_id
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
          where correct_answers.assesment is NULL
        `,
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
      MySql2.execute(
        conn,
        `
        select id, question, answer, alternatives, variant
          from quizzes 
          order by RAND() asc
        `,
        None,
        msg =>
          switch msg {
          | #Error(e) => reject(. MySql2.Exn.toExn(e))
          | #Select(select) => resolve(. MySql2.Select.rows(select)[0])
          | #Mutation(_) => reject(. Failure("UNEXPECTED_MUTATION"))
          },
      )
    )
  )
