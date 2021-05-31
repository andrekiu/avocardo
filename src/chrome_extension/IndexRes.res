type props = {hell: string}

module P = {
  @react.component
  let make = (~hell: string) => {
    <div> {React.string("Hello from rescript and next " ++ hell)} </div>
  }
}

let default = (props: props) => {
  <P hell={props.hell} />
}

let getServerSideProps: Next.GetServerSideProps.t<props, unit, unit> = ctx => {
  let cookies = Next.GetServerSideProps.Req.getCookies(ctx.req)
  let fingerprint = switch Js.Dict.get(cookies, "fingerprint") {
  | None => {
      let fp = ServerFingerprint.gen()
      Next.GetServerSideProps.Res.setHeader(
        ctx.res,
        "Set-Cookie",
        "fingerprint=" ++ fp ++ "; SameSite=Strict; Expires=Wed, 21 Oct 2021 07:28:00 GMT",
      )
      fp
    }
  | Some(fp) => fp
  }
  Js.log(cookies)
  Js.Promise.resolve({"props": {hell: fingerprint}})
}
