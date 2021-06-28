@react.component
let make = () =>
  <div className={Cx.join([Cx.index["app"], Cx.index["shimmer"]])}>
    <span> {React.string("Loading...")} </span>
  </div>
