let genInsertAnswer = (answer: {"fingerprint": string, "quiz_id": string, "didSucceed": bool}) =>
  Js.Promise.make((~resolve, ~reject) => {
    let answeredTime =
      (Js.Date.make() |> Js.Date.toISOString |> Js.String.replace("T", " ") |> Js.String.split("."))
        ->Array.get(0)
    let statement = `
      insert into answers (fingerprint, question_id, assesment, answered_time) 
      values ('${answer["fingerprint"]}', '${answer["quiz_id"]}', '${answer["didSucceed"]
        ? "CORRECT"
        : "INCORRECT"}', '${answeredTime}')
    `
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
