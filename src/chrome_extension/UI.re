module Wait = {
  [@react.component]
  let make = (~wait: Suspendable.t(unit)) => {
    wait.read();
    React.null;
  };
};

let fetchExercise = () => {
  Suspendable.make(Translation.getExercise());
};

let delay = () => {
  Suspendable.make(Timer.waitMS(500));
};

module App = {
  [@react.component]
  let make = () => {
    let (wait, setWait) = React.useState(() => delay());
    let (exercise, setExercise) = React.useState(fetchExercise);

    <React.Suspense fallback={React.string("Loading...")}>
      <Wait wait />
      <Card
        exercise
        next={() => {
          setWait(_ => delay());
          setExercise(_ => fetchExercise());
        }}
      />
    </React.Suspense>;
  };
};

switch (ReactDOM.querySelector("#root")) {
| Some(root) => ReactDOM.render(<App />, root)
| None => ()
};
