// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css-dom/src/Css.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var $$String = require("bs-platform/lib/js/string.js");
var Caml_string = require("bs-platform/lib/js/caml_string.js");
var PronounExercises$Avocardo = require("../server/exercises/PronounExercises.bs.js");

var bold = Css.style({
      hd: Css.fontWeight("bold"),
      tl: /* [] */0
    });

var noop = Css.style(/* [] */0);

function opacity(pct) {
  return Css.style({
              hd: Css.backgroundColor(Css.rgba(168, 202, 89, {
                        NAME: "percent",
                        VAL: pct
                      })),
              tl: /* [] */0
            });
}

var Styles = {
  bold: bold,
  noop: noop,
  opacity: opacity
};

function create(word, matchedPrefix) {
  return {
          tokens: matchedPrefix !== 0 ? (
              matchedPrefix >= word.length ? [[
                    word,
                    true
                  ]] : [
                  [
                    $$String.sub(word, 0, matchedPrefix),
                    true
                  ],
                  [
                    $$String.sub(word, matchedPrefix, word.length - matchedPrefix | 0),
                    false
                  ]
                ]
            ) : [[
                word,
                false
              ]],
          container: word.length === 0 ? 0 : matchedPrefix / word.length * 100
        };
}

function map(fn, tok) {
  return $$Array.map((function (param) {
                return Curry._2(fn, param[0], param[1] ? bold : noop);
              }), tok.tokens);
}

function highlight(tok) {
  return opacity(tok.container);
}

var StyledToken = {
  create: create,
  map: map,
  highlight: highlight
};

function match_(words, prefix) {
  var max_match = function (a, b, _idx) {
    while(true) {
      var idx = _idx;
      if (a.length <= idx || b.length <= idx) {
        return idx;
      }
      if (Caml_string.get(a, idx) !== Caml_string.get(b, idx)) {
        return idx;
      }
      _idx = idx + 1 | 0;
      continue ;
    };
  };
  return $$Array.map((function (w) {
                return create(w, max_match(w, prefix, 0));
              }), $$Array.map(PronounExercises$Avocardo.toString, words));
}

function style(word, pronouns, candidates) {
  var tokens = $$String.split_on_char(/* " " */32, word);
  if (!tokens) {
    return [
            match_(pronouns, ""),
            match_(candidates, "")
          ];
  }
  var match = tokens.tl;
  var h = tokens.hd;
  if (match) {
    return [
            match_(pronouns, h),
            match_(candidates, match.hd)
          ];
  } else {
    return [
            match_(pronouns, h),
            match_(candidates, "")
          ];
  }
}

var StyledWords = {
  match_: match_,
  style: style
};

function Token(Props) {
  var tok = Props.tok;
  return React.createElement("button", {
              style: opacity(tok.container)
            }, map((function (str, style) {
                    return React.createElement("span", {
                                style: style
                              }, str);
                  }), tok));
}

var make = Token;

exports.Styles = Styles;
exports.StyledToken = StyledToken;
exports.StyledWords = StyledWords;
exports.make = make;
/* bold Not a pure module */
