let genInsertFeedback = (payload: {"fingerprint": string, "quiz_id": string, "feedback": string}) =>
  Js.Promise.make((~resolve, ~reject) => {
    let createdTime =
      (Js.Date.make() |> Js.Date.toISOString |> Js.String.replace("T", " ") |> Js.String.split("."))
        ->Array.get(0)
    let statement = `
      insert into feedback (fingerprint, quiz_id, feedback, created_time) 
      values (
        '${payload["fingerprint"]}', 
        '${payload["quiz_id"]}', 
        '${payload["feedback"]}', 
        '${createdTime}')
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
