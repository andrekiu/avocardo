@module
external styles: {
  "root": string,
  "card": string,
  "header": string,
  "header-glyph": string,
  "card-title": string,
  "card-body": string,
  "charts": string,
  "charts-controls": string,
  "charts-controls-selected": string,
} = "./Dashboard.module.css"

module Query = %relay(`
  query DashboardQuery($range: ChartTimeRange!) {
    getAdminProfile {
      ...AnswersOverTime @arguments(range: $range)
      ...SessionsOverTime @arguments(range: $range)
      ...FeedbackOverTime @arguments(range: $range)
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

open Query.Types

module Controls = {
  @react.component
  let make = (~timeRange, ~setTimeRange) => {
    <div className={styles["charts-controls"]}>
      <a
        className={timeRange == #LIFETIME ? styles["charts-controls-selected"] : Cx.noop}
        onClick={_ => setTimeRange(_ => #LIFETIME)}>
        {React.string("Lifetime")}
      </a>
      <a
        className={timeRange == #LAST_30_DAYS ? styles["charts-controls-selected"] : Cx.noop}
        onClick={_ => setTimeRange(_ => #LAST_30_DAYS)}>
        {React.string("Last 30d")}
      </a>
    </div>
  }
}

@react.component
let make = () => {
  let (timeRange, setTimeRange) = React.useState(() => #LAST_30_DAYS)
  let {getAdminProfile} = Query.use(~variables={{range: timeRange}}, ())
  <div className={styles["root"]}>
    <div className={styles["header"]}>
      <span className={styles["header-glyph"]}> <Glyph variant={Glyph.Avocado} /> </span>
      {React.string("Avocardo Admin / Dashboard")}
    </div>
    <section className={styles["charts"]}>
      <Controls timeRange setTimeRange />
      <Card title="Sessions">
        <React.Suspense fallback={React.null}>
          <SessionsOverTime fragmentRef={getAdminProfile.fragmentRefs} />
        </React.Suspense>
      </Card>
      <Card title="Answers">
        <React.Suspense fallback={React.null}>
          <AnswersOverTime fragmentRef={getAdminProfile.fragmentRefs} />
        </React.Suspense>
      </Card>
      <Card title="Feedback">
        <React.Suspense fallback={React.null}>
          <FeedbackOverTime fragmentRef={getAdminProfile.fragmentRefs} />
        </React.Suspense>
      </Card>
    </section>
  </div>
}
