module Styles = {
  open Css;
  let app = style([height(px(200)), width(px(200))]);
  let challenge =
    style([
      textAlign(center),
      height(px(25)),
      verticalAlign(middle),
      marginTop(px(25)),
    ]);
  let options =
    style([
      display(`flex),
      width(pct(100.)),
      height(px(150)),
      justifyContent(`spaceEvenly),
    ]);
  let column =
    style([
      display(`flex),
      flexDirection(`column),
      justifyContent(`spaceEvenly),
    ]);
  let center =
    style([
      display(inlineBlock),
      margin2(~v=`percent(45.), ~h=`percent(25.)),
      textAlign(center),
    ]);
};

module Evaluation = {
  open PronounExercises;
  let contains = (translations, w) =>
    Array.exists(
      t =>
        switch (t) {
        | PronounExercises.Right(t) => t == w
        | _ => false
        },
      translations,
    );

  let solved = (selection, exercise) => {
    let tokens = String.split_on_char(' ', selection);
    switch (tokens) {
    | [p, c] =>
      contains(exercise.pronouns, p) && contains(exercise.nouns, c)
    | _ => false
    };
  };

  let solution = exercise => {
    let rec findRight = (opts, idx) =>
      switch (opts[idx]) {
      | Right(str) => str
      | Wrong(_) => findRight(opts, idx + 1)
      };
    findRight(exercise.pronouns, 0) ++ " " ++ findRight(exercise.nouns, 0);
  };

  [@react.component]
  let make = (~selection, ~exercise, ~onNext) => {
    <div style=Styles.app>
      {solved(selection, exercise)
         ? <button onClick={_ => onNext()} style=Styles.center>
             {React.string("Beautiful Pepper")}
           </button>
         : <>
             <div style=Styles.center>
               <div> {React.string(exercise.quiz)} </div>
               <div> {React.string(solution(exercise))} </div>
               <button onClick={_ => onNext()}>
                 {React.string("Farty Pepper")}
               </button>
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
  | (_, _) => false
  };

let useReducer = (getInitialState, reduce) => {
  let (state, setState) = React.useState(getInitialState);
  let dispatch = a => {
    setState(s => reduce(s, a));
  };
  Keyboard.use(
    ~onChar=React.useCallback(c => dispatch(Char(c))),
    ~onEnter=
      React.useCallback1(
        () => {
          if (willRestartQuiz(state, reduce_quiz(state, Enter))) {
            Translation.next();
          };
          dispatch(Enter);
        },
        [|state|],
      ),
    ~onDelete=React.useCallback(() => dispatch(Delete)),
  );
  (state, Translation.getExercise(), dispatch);
};

[@react.component]
let make = () => {
  let (quiz, e, dispatch) = useReducer(() => Solving(""), reduce_quiz);
  switch (quiz) {
  | Solving(selection) =>
    let (styledPronouns, styledCandidates) =
      Token.StyledWords.style(selection, e.pronouns, e.nouns);
    <div style=Styles.app>
      <div> {React.string(selection)} </div>
      <div style=Styles.challenge> {React.string(e.quiz)} </div>
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
