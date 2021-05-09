type word =
  | Right(string)
  | Wrong(string)

type pronoun_exercise = {
  id: int,
  quiz: string,
  pronouns: array<word>,
  nouns: array<word>,
}

let toString = w =>
  switch w {
  | Right(str) => str
  | Wrong(str) => str
  }

module Encode = {
  let word = w => {
    open Json.Encode
    switch w {
    | Right(w) => object_(list{("word", string(w)), ("is_solution", bool(true))})
    | Wrong(w) => object_(list{("word", string(w)), ("is_solution", bool(false))})
    }
  }

  let exercise = ({id, quiz, nouns, pronouns}) => {
    open Json.Encode
    object_(list{
      ("id", int(id)),
      ("quiz", string(quiz)),
      ("nouns", array(word, nouns)),
      ("pronouns", array(word, pronouns)),
    })
  }
}

module Decode = {
  open Json.Decode
  let word = (json): word => {
    let w = json |> field("word", string)
    json |> field("is_solution", bool) ? Right(w) : Wrong(w)
  }

  let exercise = (json): pronoun_exercise => {
    id: json |> field("id", int),
    quiz: json |> field("quiz", string),
    pronouns: json |> field("pronouns", array(word)),
    nouns: json |> field("nouns", array(word)),
  }
}

let pickRandom = exercises => Belt.Array.shuffle(exercises)[0]
