module Styles = {
  open Css;
  let app =
    style([
      height(`px(200)),
      width(`px(200)),
      display(`grid),
      gridTemplateColumns([`repeat((`num(3), `fr(1.)))]),
      gridGap(`px(10)),
      gridAutoRows(`minmax((`px(50), `auto))),
    ]);
  let center = style([gridColumn(2, 2), gridRow(2, 2)]);
};

[@react.component]
let make = () => {
  <div style=Styles.app>
    <span style=Styles.center> {React.string("Loading...")} </span>
  </div>;
};
