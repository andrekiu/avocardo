let genInsertAnswer = (answer: Answer.Decode.t) =>
  Js.Promise.make((~resolve, ~reject) => {
    let statement = {
      open Requery.QueryBuilder
      (answer.fingerprint, answer.question_id, Answer.Encode.assesmentToStr(answer.assesment))
      |> insertOne(((fp, question_id, assesment)) => list{
        (cname("fingerprint"), string(fp)),
        (cname("question_id"), int(question_id)),
        (cname("assesment"), string(assesment)),
        (
          cname("answered_time"),
          string(
            (Js.Date.make()
            |> Js.Date.toISOString
            |> Js.String.replace("T", " ")
            |> Js.String.split("."))->Array.get(0),
          ),
        ),
      })
      |> into(tname("answers"))
    }->Requery.RenderQuery.Default.insert

    DB.withConnection(conn =>
      MySql2.execute(conn, statement, None, msg =>
        switch msg {
        | #Error(e) => reject(. MySql2.Exn.toExn(e))
        | #Select(_) => reject(. Failure("UNEXPECTED_SELECT"))
        | #Mutation(mutation) => resolve(. MySql2.Mutation.insertId(mutation))
        }
      )
    )
  })

let genSave = json => Answer.Decode.answer(json) |> genInsertAnswer |> Js.Promise.resolve
