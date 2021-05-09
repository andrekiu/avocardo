type callback<'input, 'output> = 'input => 'output

type transitionConfig = {timeoutMs: int}

@module("react")
external useTransition: (
  ~config: transitionConfig=?,
  unit,
) => (callback<callback<unit, unit>, unit>, bool) = "unstable_useTransition"

type t
@module("react-dom") external createRoot: 'a => t = "unstable_createRoot"

@send external render: (t, 'r) => unit = "render"

@module("react")
external useStateStatic: 'state => ('state, 'state => unit) = "useState"
