let style =
  Css.(
    style([
      height(`px(11)),
      width(`px(6)),
      backgroundColor(`currentColor),
      display(inlineBlock),
      marginLeft(px(1)),
      verticalAlign(middle),
    ])
  );
[@react.component]
let make = () => {
  <span style />;
};
