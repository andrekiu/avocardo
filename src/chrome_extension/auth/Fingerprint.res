module Internals = {
  @scope("chrome.storage.sync") @val
  external getSynced: (string, 'a => 'b) => unit = "get"

  @scope("chrome.storage.sync") @val
  external setSynced: ('a, unit => 'b) => unit = "set"

  @new external createUint8Array: int => array<'a> = "Uint8Array"
  @scope("crypto") @val
  external getRandomValues: array<'a> => unit = "getRandomValues"

  @send external toString: ('a, int) => string = "toString"

  let getFingerprint = () => {
    // E.g. 8 * 32 = 256 bits token
    let randomPool = createUint8Array(32)
    getRandomValues(randomPool)
    Array.fold_left((sum, e) => sum ++ toString(e, 16), "", randomPool)
  }

  let sync = (cb: string => unit) =>
    getSynced("userid", items => {
      let userid = items["userid"]
      if Js.isNullable(userid) {
        let hash = getFingerprint()
        setSynced({"userid": hash}, () => cb(hash))
      } else {
        cb(Js.Nullable.toOption(userid) |> Belt.Option.getExn)
      }
    })
}

let get = cb => Internals.sync(cb)
