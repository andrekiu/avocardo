type filter = Any | JustFails

module FilterFragment = %relay(`
  fragment Filter on FailsConnection {
    totalCount
  }
`)

@react.component
let make = (~fails, ~filter, ~onChangeFilter, ~className) => {
  let fails = FilterFragment.use(fails)
  let failsCount = fails.totalCount
  if failsCount == 0 && filter != JustFails {
    React.null
  } else {
    <div className onClick={_ => filter == Any ? onChangeFilter(JustFails) : onChangeFilter(Any)}>
      <span id={filter == Any ? "filter-to-fail" : "filter-to-any"}>
        {filter == Any
          ? React.string(Js.String.fromCodePoint(0x1F525))
          : React.string(Js.String.fromCodePoint(0x1F648))}
        {failsCount == 0 ? React.null : React.string(` ${string_of_int(failsCount)}`)}
      </span>
    </div>
  }
}
