@module
external style: {
  "feedback": string,
  "feedback-controls": string,
  "feedback-question": string,
  "feedback-quiz": string,
  "feedback-options": string,
} = "./Feedback.module.css"

@get external getChecked: Dom.element => bool = "checked"

module AddFeedback = %relay(`
  mutation FeedbackAddFeedbackMutation($fingerprint: ID!, $quiz_id: ID!, $feedback: [QuestionFeedback!]!) {
    addFeedback(fingerprint: $fingerprint, quiz_id: $quiz_id, feedback: $feedback) {
      id
    }
  }
`)

@react.component
let make = (~fingerprint, ~exercise: PronounExercises.pronoun_exercise, ~onBack, ~onContinue) => {
  let faultyQuizRef = React.useRef(Js.Nullable.null)
  let faultyOptionRef = React.useRef(Js.Nullable.null)
  let brokenAppRef = React.useRef(Js.Nullable.null)
  let (addFeedback, _) = AddFeedback.use()
  <div className={Cx.join([Cx.index["app"], style["feedback"]])}>
    <div id={"feedback"} className={style["feedback-question"]}>
      {React.string("Help us improve Avocardo!")}
    </div>
    <div className={style["feedback-quiz"]}> {React.string(`Quiz: ${exercise.quiz}`)} </div>
    <div>
      <ul id="feedback-options" className={style["feedback-options"]}>
        <li>
          <input ref={ReactDOM.Ref.domRef(faultyQuizRef)} type_="checkbox" />
          <label> {React.string("Quiz is faulty")} </label>
        </li>
        <li>
          <input ref={ReactDOM.Ref.domRef(faultyOptionRef)} type_="checkbox" />
          <label> {React.string("Options are faulty")} </label>
        </li>
        <li>
          <input ref={ReactDOM.Ref.domRef(brokenAppRef)} type_="checkbox" />
          <label> {React.string("App is broken")} </label>
        </li>
      </ul>
    </div>
    <div className={style["feedback-controls"]}>
      <button id="back" onClick={_ => onBack()}> {React.string("Back")} </button>
      <button
        id="continue"
        onClick={_ => {
          addFeedback(
            ~variables={
              fingerprint: fingerprint,
              quiz_id: string_of_int(exercise.id),
              feedback: [
                (#FAULTY_OPTIONS, faultyOptionRef),
                (#FAULTY_QUIZ, faultyQuizRef),
                (#APP_BROKEN, brokenAppRef),
              ]
              |> Array.map(((feedback, ref: React.ref<Js.Nullable.t<Dom.element>>)) =>
                switch ref.current->Js.Nullable.toOption {
                | Some(dom) if dom->getChecked => Some(feedback)
                | _ => None
                }
              )
              |> Js.Array.filter(Belt.Option.isSome)
              |> Array.map(Belt.Option.getExn),
            },
            (),
          )->ignore
          onContinue()
        }}>
        {React.string("Continue")}
      </button>
    </div>
  </div>
}
