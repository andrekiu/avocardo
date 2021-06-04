open IndexResTypes

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
  Js.Promise.resolve({"props": {fingerprint: fingerprint}})
}
