let getExercise = () => {
  Fetch.fetch("http://127.0.0.1:3000/pronoun_exercises")
  |> Js.Promise.then_(Fetch.Response.json)
  |> Js.Promise.then_(txt =>
       txt
       |> Json.Decode.field("data", PronounExercises.Decode.exercise)
       |> Js.Promise.resolve
     );
};
