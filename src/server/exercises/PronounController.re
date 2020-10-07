open PronounExercises;
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

let jsonResponse = () => {
  getPronounExercices() |> pickRandom |> Encode.exercise;
};
