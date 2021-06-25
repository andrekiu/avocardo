@module external style: {"token": string} = "./Token.module.css"
module Styles = {
  let bold = ReactDOM.Style.make(~fontWeight="bold", ())
  let noop = ReactDOM.Style.make()
  let token = pct => {
    let begin_rgb = (223., 223., 226.)
    let end_rgb = (180., 206., 141.)
    let get_delta = ((r1, g1, b1), (r2, g2, b2)) => (r2 -. r1, g2 -. g1, b2 -. b1)
    let scale = ((r, g, b), (dr, dg, db), pct) => (r +. dr *. pct, g +. dg *. pct, b +. db *. pct)
    let (r, g, b) = scale(begin_rgb, get_delta(begin_rgb, end_rgb), pct)
    let to_str = e => e->int_of_float->string_of_int
    ReactDOM.Style.make(~backgroundColor=`rgb(${r->to_str}, ${g->to_str}, ${b->to_str})`, ())
  }
}

module StyledToken = {
  type styled = (string, bool)
  type t = {
    word: string,
    tokens: array<styled>,
    pct_match: float,
  }

  let create = (word: string, matchedPrefix: int): t => {
    word: word,
    tokens: switch matchedPrefix {
    | 0 => [(word, false)]
    | t if t >= String.length(word) => [(word, true)]
    | t => [(String.sub(word, 0, t), true), (String.sub(word, t, String.length(word) - t), false)]
    },
    pct_match: String.length(word) == 0
      ? 0.
      : float_of_int(matchedPrefix) /. float_of_int(String.length(word)),
  }
  let map = (fn, tok: t) =>
    Array.map(((word, highlight)) => fn(word, highlight ? Styles.bold : Styles.noop), tok.tokens)

  let style = tok => Styles.token(tok.pct_match)
}

module StyledWords = {
  let match_ = (words: array<PronounExercises.word>, prefix) =>
    Array.map(
      w => StyledToken.create(w, Words.max_prefix(w, prefix)),
      Array.map(PronounExercises.toString, words),
    )

  let style = (word, pronouns, candidates) => {
    let tokens = String.split_on_char(' ', word)
    switch tokens {
    | list{} => (match_(pronouns, ""), match_(candidates, ""))
    | list{h} => (match_(pronouns, h), match_(candidates, ""))
    | list{h, t, ..._} => (match_(pronouns, h), match_(candidates, t))
    }
  }
}

@react.component
let make = (~tok, ~onClick) =>
  <button className={style["token"]} style={StyledToken.style(tok)} onClick={_ => onClick()}>
    {StyledToken.map((str, style) => <span style> {React.string(str)} </span>, tok) |> React.array}
  </button>
