let get = [%raw {|
function get(m) {
  return process.env.SERVER_DOMAIN;
}
|}];

let getDomain = path => {
  let maybeDomain = get(); // Node.Process.process##env->Js.Dict.get("SERVER_DOMAIN");
  let domain = maybeDomain |> Belt.Option.getExn;
  {j|$domain/$path|j};
};

let getExercise = () => {
  getDomain("pronoun_exercises")
  |> Fetch.fetch
  |> Js.Promise.then_(Fetch.Response.json)
  |> Js.Promise.then_(txt =>
       txt
       |> Json.Decode.field("data", PronounExercises.Decode.exercise)
       |> Js.Promise.resolve
     );
};
