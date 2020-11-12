open PronounExercises;
type filter =
  | Any
  | JustFails;
type t = {
  fails: list(pronoun_exercise),
  exercise: Suspendable.t(pronoun_exercise),
};

let getExercise = (qm, filter) => {
  switch (filter) {
  | Any => Suspendable.make(Translation.getExercise())
  | JustFails =>
    let shuffled = Array.of_list(qm.fails) |> Belt.Array.shuffle;
    Suspendable.const(shuffled[0]);
  };
};

let make = (): t => {
  fails: [],
  exercise: Suspendable.make(Translation.getExercise()),
};
let appendFail = (qm: t, f) => {...qm, fails: [f, ...qm.fails]};
let removeFail = (qm: t, f) => {
  ...qm,
  fails: List.filter(e => e.quiz != f.quiz, qm.fails),
};
let preloadQuery = (qm: t, f) => {...qm, exercise: getExercise(qm, f)};
