let waitMS = delay =>
  Js.Promise.make((~resolve, ~reject as _) =>
    Js.Global.setTimeout(() => resolve(. ignore()), delay)->ignore
  )
