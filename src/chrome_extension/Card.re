module Styles = {
  open Css;
  let app =
    style([
      height(px(200)),
      width(px(200)),
      border(`px(1), `solid, `currentColor),
      display(`grid),
      gridTemplateColumns([`repeat((`num(3), `fr(1.)))]),
      gridAutoRows(`minmax((`px(20), `px(20)))),
    ]);

  let input = style([gridRow(3, 3), gridColumn(1, 4), textAlign(center)]);

  let challenge =
    style([
      gridRow(2, 2),
      gridColumn(1, 4),
      textAlign(center),
      fontWeight(`bold),
    ]);
  let options =
    style([
      gridRow(4, 10),
      gridColumn(1, 4),
      display(`flex),
      justifyContent(`spaceEvenly),
    ]);
  let column =
    style([
      display(`flex),
      flexDirection(`column),
      justifyContent(`spaceEvenly),
      alignItems(`center),
    ]);
  let center = style([gridColumn(2, 2), gridRow(5, 7), textAlign(center)]);
  let filter =
    style([gridColumn(3, 3), gridRow(1, 1), textAlign(`center)]);
};

module ExerciseSolver = {
  open PronounExercises;
  let contains = (translations, w) =>
    Array.exists(
      t =>
        switch (t) {
        | PronounExercises.Right(t) => Words.is_match(t, w)
        | _ => false
        },
      translations,
    );

  let solution = exercise => {
    let rec findRight = (opts, idx) =>
      switch (opts[idx]) {
      | Right(str) => str
      | Wrong(_) => findRight(opts, idx + 1)
      };
    findRight(exercise.pronouns, 0) ++ " " ++ findRight(exercise.nouns, 0);
  };

  let solved = (selection, exercise) => {
    let tokens = String.split_on_char(' ', selection);
    switch (tokens) {
    | [p, c] =>
      contains(exercise.pronouns, p) && contains(exercise.nouns, c)
    | _ => false
    };
  };
};

module Evaluation = {
  [@react.component]
  let make = (~selection, ~exercise, ~onNext) => {
    <div style=Styles.app>
      {ExerciseSolver.solved(selection, exercise)
         ? <div style=Styles.center>
             <button onClick={_ => onNext()}>
               {React.string("Beautiful Pepper")}
             </button>
           </div>
         : <>
             <div style=Styles.center>
               <button onClick={_ => onNext()}>
                 {React.string("Farty Pepper")}
               </button>
               <div> {React.string(exercise.quiz)} </div>
               <div> {React.string(ExerciseSolver.solution(exercise))} </div>
             </div>
           </>}
    </div>;
  };
};

type quiz_stage =
  | Solving(string)
  | Veredict(string);

type quiz_actions =
  | Enter
  | Delete
  | Char(string);

let reduce_quiz = (state: quiz_stage, action) =>
  switch (action, state) {
  | (Enter, Solving(str)) => Veredict(str)
  | (Enter, Veredict(_)) => Solving("")
  | (Char(c), Solving(str)) => Solving(str ++ c)
  | (Delete, Solving(_)) => Solving("")
  | _ => state
  };

let willRestartQuiz = (cur, next) =>
  switch (cur, next) {
  | (Veredict(_), Solving(_)) => true
  | _ => false
  };

let willShowVeredict = (cur, next) => {
  switch (cur, next) {
  | (Solving(_), Veredict(_)) => true
  | _ => false
  };
};

[@react.component]
let make =
    (
      ~exercise: Suspendable.t(PronounExercises.pronoun_exercise),
      ~next: unit => unit,
      ~storeStatus: (PronounExercises.pronoun_exercise, bool) => unit,
      ~filter,
    ) => {
  let (quiz, setQuiz) = React.useState(() => Solving(""));
  let dispatch = a => {
    setQuiz(s => reduce_quiz(s, a));
  };
  let e = exercise.read();
  Keyboard.use(
    ~onChar=React.useCallback(c => dispatch(Char(c))),
    ~onEnter=
      React.useCallback1(
        () => {
          switch (quiz, reduce_quiz(quiz, Enter)) {
          | (Veredict(_), Solving(_)) => next()
          | (Solving(_), Veredict(s)) =>
            storeStatus(e, ExerciseSolver.solved(s, e))
          | _ => ignore()
          };
          dispatch(Enter);
        },
        [|quiz|],
      ),
    ~onDelete=React.useCallback(() => dispatch(Delete)),
  );
  switch (quiz) {
  | Solving(selection) =>
    let (styledPronouns, styledCandidates) =
      Token.StyledWords.style(selection, e.pronouns, e.nouns);
    <div style=Styles.app>
      <div style=Styles.filter> filter </div>
      <div style=Styles.challenge> {React.string(e.quiz)} </div>
      <div style=Styles.input> {React.string(selection)} <Prompt /> </div>
      <div style=Styles.options>
        <div style=Styles.column>
          {Array.map(tok => <Token tok />, styledPronouns) |> React.array}
        </div>
        <div style=Styles.column>
          {Array.map(tok => <Token tok />, styledCandidates) |> React.array}
        </div>
      </div>
    </div>;
  | Veredict(selection) =>
    <Evaluation selection exercise=e onNext={() => dispatch(Enter)} />
  };
};
