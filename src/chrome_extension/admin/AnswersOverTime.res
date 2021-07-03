@module
external styles: {"answers": string} = "./AnswersOverTime.module.css"
let nextDate = dsStr => {
  let ds = Js.Date.fromString(dsStr)
  let tokens =
    Js.Date.setDate(ds, Js.Date.getDate(ds) +. 1.)
    |> Js.Date.fromFloat
    |> Js.Date.toISOString
    |> String.split_on_char('T')
  switch tokens {
  | list{} => dsStr
  | list{answer, ..._} => answer
  }
}

type dt = {date: string, val: int}
let rec iterate = (current, end, sum) => {
  switch current {
  | current if current == end => sum
  | current =>
    iterate(
      nextDate(current),
      end,
      switch Js.Dict.get(sum, current) {
      | None => {
          Js.Dict.set(sum, current, {date: current, val: 0})
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
      let first = entries[0].date
      let last = entries[Array.length(entries) - 1].date
      let filled = iterate(first, last, entriesByDS)->Js.Dict.values
      Array.stable_sort((a, b) => {
        Pervasives.compare(a.date, b.date)
      }, filled)
      filled
    }
  }
}

module AnswersOverTimeFragment = %relay(`
  fragment AnswersOverTime on AdminProfile {
      answersOverTime {
      ds
      value
    }
  }
`)

open Avocardo.AnswersOverTime_graphql.Types
@react.component
let make = (~fragmentRef) => {
  let fragment = AnswersOverTimeFragment.use(fragmentRef)
  let data =
    fragment.answersOverTime
    |> Array.map(row => {date: row.ds, val: row.value})
    |> fillRows
    |> Array.map(row => {ds: row.date, value: row.val})

  <div className={styles["answers"]}>
    <ResponsiveContainer>
      <BarChart width={800} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ds" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  </div>
}
