@module
external styles: {
  "root": string,
  "card": string,
  "header": string,
  "header-glyph": string,
  "card-title": string,
  "card-body": string,
} = "./Dashboard.module.css"

module Query = %relay(`
  query DashboardQuery {
    getAdminProfile {
      ...AnswersOverTime
    }
  }
`)

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
  let {getAdminProfile} = Query.use(~variables=ignore(), ())
  <div className={styles["root"]}>
    <div className={styles["header"]}>
      <span className={styles["header-glyph"]}> <Glyph variant={Glyph.Avocado} /> </span>
      {React.string("Avocardo Admin / Dashboard")}
    </div>
    <Card title="Answers over time">
      <React.Suspense fallback={React.null}>
        <AnswersOverTime fragmentRef={getAdminProfile.fragmentRefs} />
      </React.Suspense>
    </Card>
  </div>
}
