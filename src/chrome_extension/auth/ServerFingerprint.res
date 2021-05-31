module Crypto = {
  type t
  @module("crypto") @val external randomFillSync: Node.Buffer.t => Node.Buffer.t = "randomFillSync"
}

let gen = () => {
  // E.g. 8 * 32 = 256 bits token
  let randomPool = Node.Buffer.fromString(String.make(32, 'c'))
  Crypto.randomFillSync(randomPool)->Node.Buffer.toStringWithEncoding(#base64)
}
