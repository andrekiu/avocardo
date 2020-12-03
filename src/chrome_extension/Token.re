module Styles = {
  open Css;
  let bold = style([fontWeight(`bold)]);
  let noop = style([]);
  let token = pct => {
    let begin_rbg = (223., 223., 226.);
    let end_rbg = (180., 206., 141.);
    let get_delta = ((r1, b1, g1), (r2, b2, g2)) => (
      r2 -. r1,
      b2 -. b1,
      g2 -. g1,
    );
    let scale = ((r, b, g), (dr, db, dg), pct) => (
      r +. dr *. pct,
      b +. db *. pct,
      g +. dg *. pct,
    );
    style([
      backgroundColor(
        switch (scale(begin_rbg, get_delta(begin_rbg, end_rbg), pct)) {
        | (r, b, g) =>
          rgb(int_of_float(r), int_of_float(b), int_of_float(g))
        },
      ),
      padding2(~v=px(8), ~h=px(12)),
      borderRadius(px(5)),
      border(px(0), `none, currentColor),
    ]);
  };
};

module StyledToken = {
  type styled = (string, bool);
  type t = {
    tokens: array(styled),
    pct_match: float,
  };

  let create = (word: string, matchedPrefix: int): t => {
    tokens:
      switch (matchedPrefix) {
      | 0 => [|(word, false)|]
      | t when t >= String.length(word) => [|(word, true)|]
      | t => [|
          (String.sub(word, 0, t), true),
          (String.sub(word, t, String.length(word) - t), false),
        |]
      },
    pct_match:
      String.length(word) == 0
        ? 0.
        : float_of_int(matchedPrefix) /. float_of_int(String.length(word)),
  };
  let map = (fn, tok: t) => {
    Array.map(
      ((word, highlight)) =>
        fn(word, highlight ? Styles.bold : Styles.noop),
      tok.tokens,
    );
  };

  let style = tok => {
    Styles.token(tok.pct_match);
  };
};

module StyledWords = {
  let match = (words: array(PronounExercises.word), prefix) => {
    Array.map(
      w => StyledToken.create(w, Words.max_prefix(w, prefix)),
      Array.map(PronounExercises.toString, words),
    );
  };

  let style = (word, pronouns, candidates) => {
    let tokens = String.split_on_char(' ', word);
    switch (tokens) {
    | [] => (match(pronouns, ""), match(candidates, ""))
    | [h] => (match(pronouns, h), match(candidates, ""))
    | [h, t, ..._] => (match(pronouns, h), match(candidates, t))
    };
  };
};

[@react.component]
let make = (~tok) => {
  <button style={StyledToken.style(tok)}>
    {StyledToken.map(
       (str, style) => <span style> {React.string(str)} </span>,
       tok,
     )
     |> React.array}
  </button>;
};
