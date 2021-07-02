@module
external styles: {
  "root": string,
  "card": string,
  "header": string,
  "header-glyph": string,
  "card-title": string,
  "card-body": string,
  "answers": string,
} = "./Dashboard.module.css"

module Query = %relay(`
  query DashboardQuery {
    getAdminProfile {
      answersOverTime {
        ds
        value
      }
    }
  }
`)

module AnswersOverTime = {
  open Avocardo.DashboardQuery_graphql.Types
  type dt = {
    name: string,
    answers: int,
  }
  @react.component
  let make = () => {
    let {getAdminProfile} = Query.use(~variables=ignore(), ())
    let data =
      getAdminProfile.answersOverTime |> Array.map(row => {name: row.ds, answers: row.value})
    <div className={styles["answers"]}>
      <ResponsiveContainer>
        <BarChart width={800} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="answers" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  }
}

module Card = {
  @react.component
  let make = (~children, ~title) => {
    <div className={styles["card"]}>
      <div className={styles["card-title"]}> {React.string(title)} </div>
      <div className={styles["card-body"]}> {children} </div>
    </div>
  }
}

@react.component
let make = () => {
  <div className={styles["root"]}>
    <div className={styles["header"]}>
      <span className={styles["header-glyph"]}> <Glyph variant={Glyph.Avocado} /> </span>
      {React.string("Avocardo Admin / Dashboard")}
    </div>
    <Card title="Answers over time">
      <React.Suspense fallback={React.null}> <AnswersOverTime /> </React.Suspense>
    </Card>
  </div>
}
