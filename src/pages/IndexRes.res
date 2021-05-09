module P = {
  @react.component
  let make = () => {
    <div> {React.string("Hello from rescript and next")} </div>
  }
}

let default = () => {
  <P />
}
