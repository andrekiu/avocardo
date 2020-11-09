[@bs.val] external throw: Js.Promise.t('a) => 'a = "throw";

let waitMS = delay => {
  Js.Promise.make((~resolve, ~reject) => {
    Js.Global.setTimeout(() => resolve(. ignore()), delay)->ignore
  });
};
