open Express;

let app = express();

let makeSuccessJson = response => {
  let json = Js.Dict.empty();
  Js.Dict.set(json, "success", Js.Json.boolean(true));
  Js.Dict.set(json, "data", response);
  Js.Json.object_(json);
};

App.get(
  app,
  ~path="/pronoun_exercises",
  Middleware.from((_, _) => {
    Response.sendJson(makeSuccessJson(PronounExercises.jsonResponse()))
  }),
);

let onListen = e =>
  switch (e) {
  | exception (Js.Exn.Error(e)) =>
    Js.log(e);
    Node.Process.exit(1);
  | _ => Js.log("Listening at http://127.0.0.1:3000")
  };

let server = App.listen(app, ~port=3000, ~onListen, ());
