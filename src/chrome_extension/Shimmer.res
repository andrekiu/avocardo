@module external style: {"app": string, "shimmer": string} = "./Shimmer.module.css"

@react.component
let make = () =>
  <div className={style["app"]}>
    <span className={style["shimmer"]}> {React.string("Loading...")} </span>
  </div>
