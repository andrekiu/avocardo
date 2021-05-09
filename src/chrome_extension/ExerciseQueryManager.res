open PronounExercises
type filter =
  | Any
  | JustFails
type t = {
  fingerprint: string,
  fails: list<pronoun_exercise>,
  exercise: Suspendable.t<pronoun_exercise>,
}

let getExercise = (qm, filter) =>
  switch filter {
  | Any => Suspendable.make(Translation.getExercise())
  | JustFails =>
    let shuffled = Array.of_list(qm.fails) |> Belt.Array.shuffle
    Suspendable.const(shuffled[0])
  }

let saveAnswer = (qm: t, e: pronoun_exercise, didSucceed: bool) =>
  Translation.saveAnswer(
    Answer.Encode.answer({
      fingerprint: qm.fingerprint,
      question_id: e.id,
      assesment: didSucceed ? Correct : Incorrect,
    }),
  )

let make = (fingerprint): t => {
  fingerprint: fingerprint,
  fails: list{},
  exercise: Suspendable.make(Translation.getExercise()),
}
let appendFail = (qm: t, f) => {...qm, fails: list{f, ...qm.fails}}
let removeFail = (qm: t, f) => {
  ...qm,
  fails: List.filter(e => e.quiz != f.quiz, qm.fails),
}
let preloadQuery = (qm: t, f) => {...qm, exercise: getExercise(qm, f)}
