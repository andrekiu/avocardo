@module
external style: {
  "appflexcolumns": string,
  "cardquestion": string,
  "result": string,
  "emptyquiz": string,
  "emptyquiz-emoji": string,
  "emptyquiz-calltoaction": string,
  "result-quiz": string,
  "result-solution": string,
  "skip": string,
  "skip-button": string,
  "result-avocado": string,
  "challenge": string,
  "challenge-text": string,
  "input": string,
  "filter": string,
  "options": string,
  "column": string,
} = "./Card.module.css"

module ExerciseSolver = {
  open PronounExercises
  let contains = (translations, w) => Array.exists(t =>
      switch t {
      | PronounExercises.Right(t) => Words.is_match(t, w)
      | _ => false
      }
    , translations)

  let solution = exercise => {
    let rec findRight = (opts, idx) =>
      switch opts[idx] {
      | Right(str) => str
      | Wrong(_) => findRight(opts, idx + 1)
      }
    findRight(exercise.pronouns, 0) ++ (" " ++ findRight(exercise.nouns, 0))
  }

  let solved = (selection, exercise) => {
    let tokens = String.trim(selection) |> String.split_on_char(' ')
    switch tokens {
    | list{p, c} => contains(exercise.pronouns, p) && contains(exercise.nouns, c)
    | _ => false
    }
  }
}

module Result = {
  @react.component
  let make = (~exercise: PronounExercises.pronoun_exercise) =>
    <div className={style["result"]}>
      <div className={style["result-quiz"]}> {React.string(exercise.quiz)} </div>
      <div className={style["result-solution"]}>
        {ExerciseSolver.solution(exercise) |> React.string}
      </div>
    </div>
}

module Evaluation = {
  @react.component
  let make = (~selection, ~exercise: PronounExercises.pronoun_exercise, ~onClick) =>
    <div className={Cx.join([Cx.index["app"], style["appflexcolumns"]])} onClick={_ => onClick()}>
      {ExerciseSolver.solved(selection, exercise)
        ? <>
            <span id="correct" className={style["result"]}> {React.string("You got it!")} </span>
            <div className={style["result-avocado"]}>
              <Next.Image width={90} height={80} src={"/img/success.jpg"} />
            </div>
          </>
        : <>
            <Result exercise />
            <div className={style["result-avocado"]}>
              <Next.Image id="incorrect" width={90} height={80} src={"/img/failure.jpg"} />
            </div>
          </>}
    </div>
}

module FilterImpl = {
  @react.component
  let make = (~onChangeFilter, ~filter, ~filterFragment, ~className) =>
    <React.Suspense fallback={<span> {React.string("Loading...")} </span>}>
      <Filter className fails={filterFragment} filter onChangeFilter />
    </React.Suspense>
}

type quiz_stage =
  | Solving(string)
  | Veredict(string)
  | Feedback(PronounExercises.pronoun_exercise)

type quiz_actions =
  | Enter
  | Delete
  | Char(string)
  | Word(string)
  | GetFeedback(PronounExercises.pronoun_exercise)
  | BackToSolving
  | ContinueToSolving

let reduce_quiz = (state: quiz_stage, action) =>
  switch (action, state) {
  | (BackToSolving, _) => Solving("")
  | (GetFeedback(e), Solving(_)) => Feedback(e)
  | (ContinueToSolving, Feedback(_)) => Solving("")
  | (Enter, Solving(str)) => Veredict(str)
  | (Enter, Veredict(_)) => Solving("")
  | (Char(c), Solving(str)) => Solving(str ++ c)
  | (Word(w), Solving(str)) => Solving(String.length(str) == 0 ? w : str ++ " " ++ w)
  | (Delete, Solving(_)) => Solving("")
  | _ => state
  }

module CardImpl = {
  @react.component
  let make = (
    ~fingerprint,
    ~exercise: PronounExercises.pronoun_exercise,
    ~next: unit => unit,
    ~storeStatus: (PronounExercises.pronoun_exercise, bool) => unit,
    ~filter,
    ~onChangeFilter,
    ~filterFragment,
  ) => {
    let (quiz, setQuiz) = React.useState(() => Solving(""))
    let dispatch = a => setQuiz(s => reduce_quiz(s, a))
    let e = exercise
    let onEnter = React.useCallback2(() => {
      switch (quiz, reduce_quiz(quiz, Enter)) {
      | (Veredict(_), Solving(_)) => next()
      | (Solving(_), Veredict(s)) => storeStatus(e, ExerciseSolver.solved(s, e))
      | _ => ignore()
      }
      dispatch(Enter)
    }, (quiz, next))
    Keyboard.use(
      ~onChar=React.useCallback(c => dispatch(Char(c))),
      ~onEnter,
      ~onDelete=React.useCallback(() => dispatch(Delete)),
    )
    switch quiz {
    | Feedback(exercise) =>
      <Feedback
        fingerprint
        exercise
        onBack={() => dispatch(BackToSolving)}
        onContinue={() => {
          next()
          dispatch(ContinueToSolving)
        }}
      />
    | Solving(selection) =>
      let (styledPronouns, styledCandidates) = Token.StyledWords.style(
        selection,
        e.pronouns,
        e.nouns,
      )
      <div className={Cx.join([Cx.index["app"], style["cardquestion"]])}>
        <div className={style["filter"]}>
          <FilterImpl className={Cx.index["filter"]} filter onChangeFilter filterFragment />
        </div>
        <div id="challenge" className={style["challenge"]}>
          <span onClick={_ => onEnter()} className={style["challenge-text"]}>
            {React.string(e.quiz)}
          </span>
        </div>
        <div className={style["input"]} onClick={_ => dispatch(Delete)}>
          {React.string(selection)} <Prompt />
        </div>
        <div className={style["options"]}>
          <div className={style["column"]}>
            {Array.map(
              (tok: Token.StyledToken.t) => <Token tok onClick={() => dispatch(Word(tok.word))} />,
              styledPronouns,
            ) |> React.array}
          </div>
          <div className={style["column"]}>
            {Array.map(
              (tok: Token.StyledToken.t) => <Token tok onClick={() => dispatch(Word(tok.word))} />,
              styledCandidates,
            ) |> React.array}
          </div>
        </div>
        <div className={style["skip"]}>
          <span
            className={style["skip-button"]}
            id="skip-question"
            onClick={_ => dispatch(GetFeedback(e))}>
            <Glyph variant={Skip} />
          </span>
        </div>
      </div>
    | Veredict(selection) => <Evaluation selection exercise=e onClick={onEnter} />
    }
  }
}

module OutOfExercises = {
  @react.component
  let make = (~filter, ~onChangeFilter, ~filterFragment) => {
    <div className={Cx.join([Cx.index["app"], style["appflexcolumns"]])}>
      <span className={style["emptyquiz"]}>
        {filter == Filter.Any
          ? <div>
              {React.string("There are no more exercises in the library, you are on fire!")}
            </div>
          : <>
              <div> {React.string("Congratulations!")} </div>
              <div> {React.string("You have cleared all your misses!")} </div>
              <div className={style["emptyquiz-calltoaction"]}>
                <FilterImpl
                  className={style["emptyquiz-emoji"]} filter onChangeFilter filterFragment
                />
              </div>
            </>}
      </span>
    </div>
  }
}

@react.component
let make = (
  ~fingerprint,
  ~exercise: option<PronounExercises.pronoun_exercise>,
  ~next: unit => unit,
  ~storeStatus: (PronounExercises.pronoun_exercise, bool) => unit,
  ~filter,
  ~onChangeFilter,
  ~filterFragment,
) => {
  switch exercise {
  | None => <OutOfExercises filter onChangeFilter filterFragment />
  | Some(exercise) =>
    <CardImpl fingerprint exercise next storeStatus filter onChangeFilter filterFragment />
  }
}
