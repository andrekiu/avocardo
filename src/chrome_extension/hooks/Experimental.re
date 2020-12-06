type callback('input, 'output) = 'input => 'output;

type transitionConfig = {timeoutMs: int};

[@bs.module "react"]
external useTransition:
  (~config: transitionConfig=?, unit) =>
  (callback(callback(unit, unit), unit), bool) =
  "unstable_useTransition";

type t;
[@bs.module "react-dom"] external createRoot: 'a => t = "unstable_createRoot";

[@bs.send] external render: (t, 'r) => unit = "render";

[@bs.module "react"]
external useStateStatic: 'state => ('state, 'state => unit) = "useState";
