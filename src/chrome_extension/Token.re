module Styles = {
  open Css;
  let bold = style([fontWeight(`bold)]);
  let noop = style([]);
  let opacity = pct =>
    style([backgroundColor(rgba(168, 202, 89, `percent(pct)))]);
};

module StyledToken = {
  type styled = (string, bool);
  type t = {
    tokens: array(styled),
    container: float,
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
    container:
      String.length(word) == 0
        ? 0.
        : float_of_int(matchedPrefix)
          /. float_of_int(String.length(word))
          *. 100.,
  };
  let map = (fn, tok: t) => {
    Array.map(
      ((word, highlight)) =>
        fn(word, highlight ? Styles.bold : Styles.noop),
      tok.tokens,
    );
  };

  let highlight = tok => {
    Styles.opacity(tok.container);
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
  <button style={StyledToken.highlight(tok)}>
    {StyledToken.map(
       (str, style) => <span style> {React.string(str)} </span>,
       tok,
     )
     |> React.array}
  </button>;
};
