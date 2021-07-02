@module
external index: {"app": string, "filter": string, "shimmer": string, "root": string} =
  "./Core.module.css"

let join = classNames => String.concat(" ", Array.to_list(classNames))
let noop = "noop"
