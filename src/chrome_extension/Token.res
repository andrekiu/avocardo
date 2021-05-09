module Styles = {
  let bold = ReactDOM.Style.make(~fontWeight="bold", ())
  let noop = ReactDOM.Style.make()
  let token = pct => {
    let begin_rbg = (223., 223., 226.)
    let end_rbg = (180., 206., 141.)
    let get_delta = ((r1, b1, g1), (r2, b2, g2)) => (r2 -. r1, b2 -. b1, g2 -. g1)
    let scale = ((r, b, g), (dr, db, dg), pct) => (r +. dr *. pct, b +. db *. pct, g +. dg *. pct)
    let (r, b, g) = scale(begin_rbg, get_delta(begin_rbg, end_rbg), pct)
    let to_str = e => e->int_of_float->string_of_int
    ReactDOM.Style.make(
      ~backgroundColor=`${r->to_str} ${b->to_str} ${g->to_str}`,
      ~padding="8px 12px",
      ~borderRadius="5px",
      ~border="0px none currentcolor",
      (),
    )
  }
}

module StyledToken = {
  type styled = (string, bool)
  type t = {
    tokens: array<styled>,
    pct_match: float,
  }

  let create = (word: string, matchedPrefix: int): t => {
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
let make = (~tok) =>
  <button style={StyledToken.style(tok)}>
    {StyledToken.map((str, style) => <span style> {React.string(str)} </span>, tok) |> React.array}
  </button>
