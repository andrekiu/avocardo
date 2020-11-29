module Wait = {
  [@react.component]
  let make = (~wait: Suspendable.t(unit)) => {
    wait.read();
    React.null;
  };
};

let delay = () => {
  Suspendable.make(Timer.waitMS(500));
};

module Styles = {
  open Css;
  let app =
    style([
      border(`px(1), `solid, `currentColor),
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
  let style = Css.(style([cursor(pointer)]));
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
        {React.int(List.length(fails))}
        {filter == Any
           ? React.string(Js.String.fromCodePoint(0x1F525))
           : React.string(Js.String.fromCodePoint(0x1F648))}
      </div>;
    };
};

module App = {
  [@react.component]
  let make = (~qm: ExerciseQueryManager.t) => {
    let (wait, setWait) = React.useState(delay);
    let (filter, setFilter) = React.useState(() => ExerciseQueryManager.Any);
    let (response, setQuery) = React.useState(() => qm);

    <React.Suspense fallback={<Shimmer />}>
      <Wait wait />
      <Card
        exercise={response.exercise}
        next={() => {
          setWait(_ => delay());
          setQuery(qm => ExerciseQueryManager.preloadQuery(qm, filter));
        }}
        storeStatus={(e, didSucceed) => {
          ExerciseQueryManager.saveAnswer(qm, e, didSucceed);
          switch (filter, didSucceed) {
          | (Any, false) =>
            setQuery(qm => ExerciseQueryManager.appendFail(qm, e))
          | (JustFails, true) =>
            setQuery(qm => ExerciseQueryManager.removeFail(qm, e));
            if (List.length(response.fails) == 1) {
              setFilter(_ => Any);
            };
          | _ => ignore()
          };
        }}
        filter={
          <Filter
            filter
            fails={response.fails}
            onChangeFilter={f => {
              setFilter(_ => f);
              setQuery(qm => ExerciseQueryManager.preloadQuery(qm, f));
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
    ReactDOM.render(
      <App qm={ExerciseQueryManager.make(fingerprint)} />,
      root,
    )
  | None => ()
  }
});
