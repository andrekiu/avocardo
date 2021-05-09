let style = ReactDOM.Style.make(
  ~height="11px",
  ~width="6px",
  ~backgroundColor="currentcolor",
  ~display="inline-block",
  ~marginLeft="1px",
  ~verticalAlign="middle",
  (),
)
@react.component
let make = () => {
  <span style />
}
