@module
external styles: {"answers": string} = "./Charts.module.css"

module FeedbackOverTimeFragment = %relay(`
  fragment FeedbackOverTime on AdminProfile 
    @argumentDefinitions(range: {type: "ChartTimeRange!"}){
      feedbackOverTime(range: $range) {
        ds
        value
      }
    }
`)

open Avocardo.FeedbackOverTime_graphql.Types
@react.component
let make = (~fragmentRef) => {
  let fragment = FeedbackOverTimeFragment.use(fragmentRef)
  let data =
    fragment.feedbackOverTime
    |> Array.map((row): TimeSeries.dt => {date: row.ds, val: row.value})
    |> TimeSeries.fillRows
    |> Array.map((row: TimeSeries.dt) => {ds: row.date, value: row.val})

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
