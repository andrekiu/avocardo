let getStr = ds => {
  Js.Date.toISOString(ds) |> Js.String.substrAtMost(~from=0, ~length=10)
}
let nextDate = ds => {
  Js.Date.setDate(ds, Js.Date.getDate(ds) +. 1.) |> Js.Date.fromFloat
}

type dt = {date: string, val: int}
let rec iterate = (current, end, sum) => {
  switch current {
  | current if Js.Date.getTime(current) > Js.Date.getTime(end) => sum
  | current =>
    iterate(
      nextDate(current),
      end,
      switch Js.Dict.get(sum, getStr(current)) {
      | None => {
          Js.Dict.set(sum, getStr(current), {date: getStr(current), val: 0})
          sum
        }
      | Some(_) => sum
      },
    )
  }
}

let fillRows = entries => {
  let entriesByDS = Js.Dict.fromArray(Array.map(e => (e.date, e), entries))
  switch entries {
  | [] => []
  | entries => {
      let first = Js.Date.fromString(entries[0].date)
      let last = Js.Date.fromString(entries[Array.length(entries) - 1].date)
      let filled = iterate(first, last, entriesByDS)->Js.Dict.values
      Array.stable_sort((a, b) => {
        Pervasives.compare(a.date, b.date)
      }, filled)
      filled
    }
  }
}
