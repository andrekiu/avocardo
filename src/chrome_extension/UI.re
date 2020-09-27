module App = {
  [@react.component]
  let make = () => {
    <React.Suspense fallback={React.string("Loading...")}>
      <Card />
    </React.Suspense>;
  };
};

switch (ReactDOM.querySelector("#root")) {
| Some(root) => ReactDOM.render(<App />, root)
| None => ()
};
