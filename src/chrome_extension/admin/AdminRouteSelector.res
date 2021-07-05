@module
external styles: {
  "header": string,
  "header-glyph": string,
  "header-select": string,
  "header-logout": string,
} = "./AdminRouteSelector.module.css"

@module("./useLogout.js") external useLogout: unit => (bool, unit => unit) = "default"

@react.component
let make = (~route) => {
  let router = Next.Router.useRouter()
  let (inTransition, logOut) = useLogout()
  <div className={styles["header"]}>
    <span>
      <span className={styles["header-glyph"]}> <Glyph variant={Glyph.Avocado} /> </span>
      <span>
        {React.string("Avocardo Admin / ")}
        <select
          className={styles["header-select"]}
          defaultValue={route == "dashboard" ? "dashboard" : "feedback"}
          onChange={e => {
            Next.Router.push(router, `/admin/${ReactEvent.Form.target(e)["value"]}`)
          }}>
          <option value="dashboard"> {React.string("Dashboard")} </option>
          <option value="feedback"> {React.string("Feedback")} </option>
        </select>
      </span>
    </span>
    <span className={styles["header-logout"]} onClick={_ => logOut()}>
      {inTransition
        ? React.string("Login out...")
        : <> <Glyph variant={VictoryHand} /> {React.string("Logout")} </>}
    </span>
  </div>
}
