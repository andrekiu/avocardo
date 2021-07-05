@module
external styles: {
  "root": string,
  "card": string,
  "card-title": string,
  "card-body": string,
  "charts": string,
  "charts-controls": string,
  "charts-controls-selected": string,
} = "./Dashboard.module.css"

@react.component
let make = () => {
  <div className={styles["root"]}> <AdminRouteSelector route="feedback" /> </div>
}
