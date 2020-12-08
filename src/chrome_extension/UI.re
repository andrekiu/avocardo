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

module Shimmer = {
  [@react.component]
  let make = () => {
    <div style=Styles.app>
      <span style=Styles.center> {React.string("Loading...")} </span>
    </div>;
  };
};

module Filter = {
  let style =
    Css.(
      style([
        cursor(pointer),
        padding2(~v=px(10), ~h=px(15)),
        textAlign(`right),
      ])
    );
  open ExerciseQueryManager;
  [@react.component]
  let make = (~filter, ~fails, ~onChangeFilter) =>
    if (List.length(fails) == 0) {
      React.null;
    } else {
      <div
        style
        onClick={_ =>
          filter == Any ? onChangeFilter(JustFails) : onChangeFilter(Any)
        }>
        {filter == Any
           ? React.string(Js.String.fromCodePoint(0x1F525))
           : React.string(Js.String.fromCodePoint(0x1F648))}
        {React.string(" ")}
        {React.int(List.length(fails))}
      </div>;
    };
};

module App = {
  [@react.component]
  let make = (~initialQM: ExerciseQueryManager.t) => {
    let (filter, setFilter) = React.useState(() => ExerciseQueryManager.Any);
    let (qm, setQuery) = Experimental.useStateStatic(initialQM);
    let next =
      React.useCallback2(
        () => setQuery(ExerciseQueryManager.preloadQuery(qm, filter)),
        (qm, filter),
      );

    <React.Suspense fallback={<Shimmer />}>
      <Card
        exercise={qm.exercise}
        next
        storeStatus={(e, didSucceed) => {
          ExerciseQueryManager.saveAnswer(qm, e, didSucceed);
          switch (filter, didSucceed) {
          | (Any, false) => setQuery(ExerciseQueryManager.appendFail(qm, e))
          | (JustFails, true) =>
            setQuery(ExerciseQueryManager.removeFail(qm, e));
            if (List.length(qm.fails) == 1) {
              setFilter(_ => Any);
            };
          | _ => ignore()
          };
        }}
        filter={
          <Filter
            filter
            fails={qm.fails}
            onChangeFilter={f => {
              setFilter(_ => f);
              setQuery(ExerciseQueryManager.preloadQuery(qm, f));
            }}
          />
        }
      />
    </React.Suspense>;
  };
};

Fingerprint.get(fingerprint => {
  switch (ReactDOM.querySelector("#root")) {
  | Some(root) =>
    Experimental.createRoot(root)
    ->Experimental.render(
        <App initialQM={ExerciseQueryManager.make(fingerprint)} />,
      )
  | None => ()
  }
});
