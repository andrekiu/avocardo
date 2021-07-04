let genAnswersOverTime = range => {
  let where = switch range {
  | #LAST_30_DAYS => "where answered_time between now() - interval 30 day and now()"
  | _ => ""
  }
  Js.Promise.make((~resolve, ~reject) =>
    DB.withConnection(conn =>
      MySql2.execute(
        conn,
        `
        select DATE(answered_time) as ds, COUNT(answered_time) as value
          from answers 
          ${where}
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
}

let genSessionsOverTime = range => {
  let where = switch range {
  | #LAST_30_DAYS => "where answered_time between now() - interval 30 day and now()"
  | _ => ""
  }
  Js.Promise.make((~resolve, ~reject) =>
    DB.withConnection(conn =>
      MySql2.execute(
        conn,
        `
        select DATE(answered_time) as ds, COUNT(DISTINCT fingerprint) as value
          from answers 
          ${where}
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
}
