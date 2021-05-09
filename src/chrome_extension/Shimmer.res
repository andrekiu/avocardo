module Styles = {
  let app = ReactDOM.Style.make(
    ~height="200px",
    ~width="200px",
    ~display="grid",
    ~gridTemplateColumns="repeat(3, 1fr)",
    (),
  )
  let center = ReactDOM.Style.make(~gridColumn="2 2", ~gridRow="2 2", ())
}

@react.component
let make = () =>
  <div style=Styles.app> <span style=Styles.center> {React.string("Loading...")} </span> </div>
