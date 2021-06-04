let get = %raw(`
function get(m) {
  return process.env.NEXT_PUBLIC_SERVER_DOMAIN;
}
`)

let getPathWithDomain = path => {
  let maybeDomain = get() // Node.Process.process##env->Js.Dict.get("SERVER_DOMAIN");
  let domain = maybeDomain |> Belt.Option.getExn
  j`$domain/api/$path`
}

let saveAnswer = payload =>
  {
    open Js.Promise
    Fetch.fetchWithInit(
      getPathWithDomain("answer"),
      Fetch.RequestInit.make(
        ~method_=Post,
        ~body=Fetch.BodyInit.make(Js.Json.stringify(payload)),
        ~headers=Fetch.HeadersInit.make({"Content-Type": "application/json"}),
        (),
      ),
    ) |> then_(Fetch.Response.json)
  } |> ignore

let getExercise = () =>
  getPathWithDomain("pronoun_exercises")
  |> Fetch.fetch
  |> Js.Promise.then_(Fetch.Response.json)
  |> Js.Promise.then_(txt =>
    txt |> Json.Decode.field("data", PronounExercises.Decode.exercise) |> Js.Promise.resolve
  )
