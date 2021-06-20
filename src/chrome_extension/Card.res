@module
external style: {
  "app": string,
  "appflex": string,
  "appgrid": string,
  "result": string,
  "emptyquiz": string,
  "emptyquiz-emoji": string,
  "emptyquiz-calltoaction": string,
  "result-quiz": string,
  "result-solution": string,
  "result-avocado": string,
  "challenge": string,
  "filter": string,
  "input": string,
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
  let make = (~selection, ~exercise: PronounExercises.pronoun_exercise) =>
    <div className={Cx.join([style["app"], style["appgrid"]])}>
      {ExerciseSolver.solved(selection, exercise)
        ? <>
            <span className={style["result"]}> {React.string("You got it!")} </span>
            <img className={style["result-avocado"]} src={"/img/success.jpg"} />
          </>
        : <>
            <Result exercise /> <img className={style["result-avocado"]} src={"/img/failure.jpg"} />
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

type quiz_actions =
  | Enter
  | Delete
  | Char(string)

let reduce_quiz = (state: quiz_stage, action) =>
  switch (action, state) {
  | (Enter, Solving(str)) => Veredict(str)
  | (Enter, Veredict(_)) => Solving("")
  | (Char(c), Solving(str)) => Solving(str ++ c)
  | (Delete, Solving(_)) => Solving("")
  | _ => state
  }

module CardImpl = {
  @module external filterStyle: {"filter": string} = "./Index.module.css"
  @react.component
  let make = (
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
    Keyboard.use(
      ~onChar=React.useCallback(c => dispatch(Char(c))),
      ~onEnter=React.useCallback2(() => {
        switch (quiz, reduce_quiz(quiz, Enter)) {
        | (Veredict(_), Solving(_)) => next()
        | (Solving(_), Veredict(s)) => storeStatus(e, ExerciseSolver.solved(s, e))
        | _ => ignore()
        }
        dispatch(Enter)
      }, (quiz, next)),
      ~onDelete=React.useCallback(() => dispatch(Delete)),
    )
    switch quiz {
    | Solving(selection) =>
      let (styledPronouns, styledCandidates) = Token.StyledWords.style(
        selection,
        e.pronouns,
        e.nouns,
      )
      <div className={Cx.join([style["app"], style["appgrid"]])}>
        <div className={style["filter"]}>
          <FilterImpl className={filterStyle["filter"]} filter onChangeFilter filterFragment />
        </div>
        <div className={style["challenge"]}> {React.string(e.quiz)} </div>
        <div className={style["input"]}> {React.string(selection)} <Prompt /> </div>
        <div className={style["options"]}>
          <div className={style["column"]}>
            {Array.map(tok => <Token tok />, styledPronouns) |> React.array}
          </div>
          <div className={style["column"]}>
            {Array.map(tok => <Token tok />, styledCandidates) |> React.array}
          </div>
        </div>
      </div>
    | Veredict(selection) => <Evaluation selection exercise=e />
    }
  }
}

module OutOfExercises = {
  @react.component
  let make = (~filter, ~onChangeFilter, ~filterFragment) => {
    <div className={Cx.join([style["app"], style["appflex"]])}>
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
  ~exercise: option<PronounExercises.pronoun_exercise>,
  ~next: unit => unit,
  ~storeStatus: (PronounExercises.pronoun_exercise, bool) => unit,
  ~filter,
  ~onChangeFilter,
  ~filterFragment,
) => {
  switch exercise {
  | None => <OutOfExercises filter onChangeFilter filterFragment />
  | Some(exercise) => <CardImpl exercise next storeStatus filter onChangeFilter filterFragment />
  }
}
