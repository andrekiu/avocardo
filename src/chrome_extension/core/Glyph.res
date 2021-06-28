type variant = Fire | Monkey | Skip

let getContent = v =>
  switch v {
  | Fire => React.string(Js.String.fromCodePoint(0x1F525))
  | Monkey => React.string(Js.String.fromCodePoint(0x1F648))
  | Skip => React.string(Js.String.fromCodePoint(0x23ED))
  }

@react.component
let make = (~variant: variant, ~className=?) => {
  <span className={Belt.Option.getWithDefault(className, Cx.noop)}> {getContent(variant)} </span>
}
