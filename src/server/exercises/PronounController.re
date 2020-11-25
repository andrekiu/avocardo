open PronounExercises;

module Decode = {
  open Json.Decode;
  type t = {
    question: string,
    answer: string,
    alternatives: array(string),
  };
  let row = (json): t => {
    question: json |> field("question", string),
    answer: json |> field("answer", string),
    alternatives: json |> field("alternatives", array(string)),
  };
};

let format = ({question, answer, alternatives}: Decode.t) => {
  let split = sentence => {
    let firstBlankspace = String.index(sentence, ' ');
    (
      String.sub(sentence, 0, firstBlankspace),
      String.sub(
        sentence,
        firstBlankspace + 1,
        String.length(sentence) - firstBlankspace - 1,
      ),
    );
  };

  let dedupe = words => {
    Array.sort(Pervasives.compare, words);
    let rec iterator = (prev, idx, sum) =>
      if (idx == Array.length(words)) {
        sum;
      } else {
        prev == words[idx]
          ? iterator(prev, idx + 1, sum)
          : iterator(words[idx], idx + 1, [words[idx], ...sum]);
      };
    iterator("", 0, [])->Array.of_list;
  };

  let label = (answer, words) => {
    Array.map(w => w == answer ? Right(w) : Wrong(w), words);
  };

  let transform = (words, right) =>
    dedupe(Array.append(words, [|right|])) |> label(right);

  let (pronounAnswer, nounAnswer) = split(answer);
  let components = Array.map(split, alternatives);
  {
    quiz: question,
    pronouns: transform(Array.map(fst, components), pronounAnswer),
    nouns: transform(Array.map(snd, components), nounAnswer),
  };
};

let genPronounExercices = () => {
  Js.Promise.make((~resolve, ~reject) => {
    MySql2.execute(
      DB.getConnection(),
      "SELECT question, answer, alternatives FROM quizzes ORDER BY RAND() LIMIT 1",
      None,
      msg =>
      switch (msg) {
      | `Error(e) => reject(. MySql2.Exn.toExn(e))
      | `Select(select) =>
        resolve(. MySql2.Select.rows(select)[0] |> Decode.row)
      | `Mutation(_) => reject(. Failure("UNEXPECTED_MUTATION"))
      }
    )
  });
};

let genJsonResponse = () => {
  genPronounExercices()
  |> Js.Promise.then_(row =>
       format(row) |> Encode.exercise |> Js.Promise.resolve
     );
};
