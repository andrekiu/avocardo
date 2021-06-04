module Filter = {
  let style = ReactDOM.Style.make(~cursor="pointer", ~padding="10px 15px", ~textAlign="right", ())
  open ExerciseQueryManager
  @react.component
  let make = (~filter, ~fails, ~onChangeFilter) =>
    if List.length(fails) == 0 {
      React.null
    } else {
      <div style onClick={_ => filter == Any ? onChangeFilter(JustFails) : onChangeFilter(Any)}>
        {filter == Any
          ? React.string(Js.String.fromCodePoint(0x1F525))
          : React.string(Js.String.fromCodePoint(0x1F648))}
        {React.string(" ")}
        {React.int(List.length(fails))}
      </div>
    }
}

module App = {
  @react.component
  let make = (~initialQM: ExerciseQueryManager.t) => {
    let (filter, setFilter) = React.useState(() => ExerciseQueryManager.Any)
    let (qm, setQuery) = Experimental.useStateStatic(initialQM)
    let next = React.useCallback2(
      () => setQuery(ExerciseQueryManager.preloadQuery(qm, filter)),
      (qm, filter),
    )

    <React.Suspense fallback={<Shimmer />}>
      <Card
        exercise=qm.exercise
        next
        storeStatus={(e, didSucceed) => {
          ExerciseQueryManager.saveAnswer(qm, e, didSucceed)
          switch (filter, didSucceed) {
          | (Any, false) => setQuery(ExerciseQueryManager.appendFail(qm, e))
          | (JustFails, true) =>
            setQuery(ExerciseQueryManager.removeFail(qm, e))
            if List.length(qm.fails) == 1 {
              setFilter(_ => Any)
            }
          | _ => ignore()
          }
        }}
        filter={<Filter
          filter
          fails=qm.fails
          onChangeFilter={f => {
            setFilter(_ => f)
            setQuery(ExerciseQueryManager.preloadQuery(qm, f))
          }}
        />}
      />
    </React.Suspense>
  }
}
