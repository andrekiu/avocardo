let genAnswersOverTime = () =>
  Js.Promise.make((~resolve, ~reject) =>
    DB.withConnection(conn =>
      MySql2.execute(
        conn,
        `
        select DATE(answered_time) as ds, COUNT(answered_time) as value
          from answers 
          group by ds
          order by ds asc
        `,
        None,
        msg =>
          switch msg {
          | #Error(e) => reject(. MySql2.Exn.toExn(e))
          | #Select(select) => resolve(. MySql2.Select.rows(select))
          | #Mutation(_) => reject(. Failure("UNEXPECTED_MUTATION"))
          },
      )
    )
  )

let genSessionsOverTime = () =>
  Js.Promise.make((~resolve, ~reject) =>
    DB.withConnection(conn =>
      MySql2.execute(
        conn,
        `
        select DATE(answered_time) as ds, COUNT(DISTINCT fingerprint) as value
          from answers 
          group by ds
          order by ds asc
        `,
        None,
        msg =>
          switch msg {
          | #Error(e) => reject(. MySql2.Exn.toExn(e))
          | #Select(select) => resolve(. MySql2.Select.rows(select))
          | #Mutation(_) => reject(. Failure("UNEXPECTED_MUTATION"))
          },
      )
    )
  )
