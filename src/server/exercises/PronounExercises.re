let csv = {|
avocado,el|*la,*palta|palto|pata
pepper,*el|la,ahi|*aji|aha
watermelon,el|*la,sandio|*sandia|sandalia
health,el|*la,*salud|saluda|saludo
hair,*el|la,caballo|*cabello|cabeza
cat,*el|la,*gato|mato|rato
noodles,*los|el|la,*fideos|feos|trineos
bull,*el|la,ternero|*toro|trofeo
|};

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

let toWord = str =>
  switch (str) {
  | "" => Wrong(str)
  | str when str.[0] == '*' =>
    Right(String.sub(str, 1, String.length(str) - 1))
  | word => Wrong(word)
  };

let getPronounExercices = () =>
  String.split_on_char('\n', csv)
  ->List.fold_left(
      (sum: list(pronoun_exercise), line) =>
        switch (String.split_on_char(',', line)) {
        | [quiz, str_pronouns, str_candidates] => [
            {
              quiz,
              pronouns:
                String.split_on_char('|', str_pronouns)
                ->List.map(toWord, _)
                ->Array.of_list,
              nouns:
                String.split_on_char('|', str_candidates)
                ->List.map(toWord, _)
                ->Array.of_list,
            },
            ...sum,
          ]
        | _ => sum
        },
      [],
      _,
    )
  ->Array.of_list;

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
