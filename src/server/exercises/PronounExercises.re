type word =
  | Right(string)
  | Wrong(string);

type pronoun_exercise = {
  quiz: string,
  pronouns: array(word),
  nouns: array(word),
};

let toString = w =>
  switch (w) {
  | Right(str) => str
  | Wrong(str) => str
  };

let scramble = (words, index) => {
  let tokens =
    Array.map(w => String.split_on_char(' ', w)->List.nth(index), words);
  let answer = tokens[0];
  Array.sort(Pervasives.compare, tokens);
  let rec iterator = (prev, idx, sum) =>
    switch (idx) {
    | idx when Array.length(tokens) == idx => sum
    | idx =>
      prev == tokens[idx]
        ? iterator(prev, idx + 1, sum)
        : iterator(
            tokens[idx],
            idx + 1,
            [
              answer == tokens[idx] ? Right(tokens[idx]) : Wrong(tokens[idx]),
              ...sum,
            ],
          )
    };
  iterator("~", 0, [])->Array.of_list->Belt.Array.shuffle;
};

let getPronounExercices = () => {
  let bigrams =
    Node.Fs.readFileAsUtf8Sync("src/server/db/bigrams.json")
    |> Js.Json.parseExn
    |> Json.Decode.dict(Json.Decode.array(Json.Decode.string));

  Js.Dict.entries(bigrams)
  ->Array.fold_left(
      (sum, (quiz, opts)) =>
        [
          {quiz, pronouns: scramble(opts, 0), nouns: scramble(opts, 1)},
          ...sum,
        ],
      [],
      _,
    )
  ->Array.of_list;
};

module Encode = {
  let word = w =>
    Json.Encode.(
      switch (w) {
      | Right(w) =>
        object_([("word", string(w)), ("is_solution", bool(true))])
      | Wrong(w) =>
        object_([("word", string(w)), ("is_solution", bool(false))])
      }
    );

  let exercise = ({quiz, nouns, pronouns}) =>
    Json.Encode.(
      object_([
        ("quiz", string(quiz)),
        ("nouns", array(word, nouns)),
        ("pronouns", array(word, pronouns)),
      ])
    );
};

module Decode = {
  open Json.Decode;
  let word = (json): word => {
    let w = json |> field("word", string);
    json |> field("is_solution", bool) ? Right(w) : Wrong(w);
  };

  let exercise = (json): pronoun_exercise => {
    quiz: json |> field("quiz", string),
    pronouns: json |> field("pronouns", array(word)),
    nouns: json |> field("nouns", array(word)),
  };
};

let decode = json => {
  json |> Json.Decode.field("data", Decode.exercise);
};

let pickRandom = exercises => {
  Belt.Array.shuffle(exercises)[0];
};

let jsonResponse = () => {
  getPronounExercices() |> pickRandom |> Encode.exercise;
};
