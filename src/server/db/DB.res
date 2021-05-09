@module("dotenv") external config: unit => unit = "config"

config()
let conn = () =>
  MySql2.Connection.connect(
    ~database="avocardo",
    ~user="root",
    ~password=Node.Process.process["env"]->Js.Dict.get("MYSQL_PWD") |> Belt.Option.getExn,
    (),
  )

let withConnection = cb => {
  let conn = conn()
  cb(conn)
  MySql2.Connection.close(conn)
}
