module Decode = {
  type assesment =
    | Correct
    | Incorrect

  let toAssesment = str => str == "CORRECT" ? Correct : Incorrect

  type t = {
    fingerprint: string,
    question_id: int,
    assesment: assesment,
  }
  let answer = (json): t => {
    open Json.Decode
    {
      fingerprint: json |> field("fingerprint", string),
      question_id: json |> field("question_id", int),
      assesment: json |> field("assesment", string) |> toAssesment,
    }
  }
}

module Encode = {
  open Json.Encode

  let assesmentToStr = a => a == Decode.Correct ? "CORRECT" : "INCORRECT"

  let answer = (a: Decode.t): Js.Json.t =>
    object_(list{
      ("fingerprint", string(a.fingerprint)),
      ("question_id", int(a.question_id)),
      ("assesment", assesmentToStr(a.assesment) |> string),
    })
}
