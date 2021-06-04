open Express

let makeSuccessJson = response => {
  let json = Js.Dict.empty()
  Js.Dict.set(json, "success", Js.Json.boolean(true))
  Js.Dict.set(json, "data", response)
  Js.Json.object_(json)
}

let handleAnswer = (req, res) => {
  AnswerController.genSave(Request.bodyJSON(req) |> Belt.Option.getExn) |> Js.Promise.then_(_ =>
    makeSuccessJson(Js.Json.number(1.))->Response.sendJson(res)->Js.Promise.resolve
  )
}

let handlePronounExercises = (_, res) => {
  PronounController.genJsonResponse() |> Js.Promise.then_(json =>
    makeSuccessJson(json)->Response.sendJson(res)->Js.Promise.resolve
  )
}
