let getPWD = %raw(`
  function() {
    return process.env.MYSQL_PWD;
  }
`)

let conn = () =>
  MySql2.Connection.connect(~database="avocardo", ~user="root", ~password=getPWD(), ())

let withConnection = cb => {
  let conn = conn()
  cb(conn)
  MySql2.Connection.close(conn)
}
