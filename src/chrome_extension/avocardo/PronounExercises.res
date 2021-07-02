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
