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
  let center = style([margin2(~v=`percent(45.), ~h=`percent(25.))]);
};

module Evaluation = {
  let contains = (translations, w) =>
    Array.exists(
      t =>
        switch (t) {
        | PronounExercises.Right(t) => t == w
        | _ => false
        },
      translations,
    );

  let solved = (selection, pronouns, candidates) => {
    let tokens = String.split_on_char(' ', selection);
    switch (tokens) {
    | [p, c] => contains(pronouns, p) && contains(candidates, c)
    | _ => false
    };
  };

  [@react.component]
  let make = (~selection, ~pronouns, ~candidates, ~onNext) => {
    <div style=Styles.app>
      <button onClick={_ => onNext()} style=Styles.center>
        {solved(selection, pronouns, candidates)
           ? React.string("Beautiful Pepper") : React.string("Farty pepper")}
      </button>
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
    <Evaluation
      selection
      pronouns={e.pronouns}
      candidates={e.nouns}
      onNext={() => dispatch(Enter)}
    />
  };
};
