type keyPressEvent = {key: string}

@scope("window") @val
external addEventListener: (string, keyPressEvent => unit) => unit = "addEventListener"
@scope("window") @val
external removeEventListener: (string, keyPressEvent => unit) => unit = "removeEventListener"

let use = (~onChar, ~onEnter, ~onDelete) =>
  React.useEffect(() => {
    // filter out more edge cases
    // support remove to clear up the selection
    let listen = ({key}) =>
      switch key {
      | "Shift" => ignore()
      | "Meta" => ignore()
      | "Alt" => ignore()
      | "Tab" => ignore()
      | "Control" => ignore()
      | "Dead" => ignore()
      | "Backspace" => onDelete()
      | "Enter" => onEnter()
      | _ => onChar(key)
      }
    addEventListener("keydown", listen)
    Some(() => removeEventListener("keydown", listen))
  })