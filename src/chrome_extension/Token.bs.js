// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css-dom/src/Css.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var $$String = require("bs-platform/lib/js/string.js");
var Words$Avocardo = require("./Words.bs.js");
var PronounExercises$Avocardo = require("../server/exercises/PronounExercises.bs.js");

var bold = Css.style({
      hd: Css.fontWeight("bold"),
      tl: /* [] */0
    });

var noop = Css.style(/* [] */0);

function token(pct) {
  var begin_rbg = [
    223,
    223,
    226
  ];
  var get_delta = function (param, param$1) {
    return [
            param$1[0] - param[0],
            param$1[1] - param[1],
            param$1[2] - param[2]
          ];
  };
  var scale = function (param, param$1, pct) {
    return [
            param[0] + param$1[0] * pct,
            param[1] + param$1[1] * pct,
            param[2] + param$1[2] * pct
          ];
  };
  var match = scale(begin_rbg, get_delta(begin_rbg, [
            180,
            206,
            141
          ]), pct);
  return Css.style({
              hd: Css.backgroundColor(Css.rgb(match[0] | 0, match[1] | 0, match[2] | 0)),
              tl: {
                hd: Css.padding2(Css.px(8), Css.px(12)),
                tl: {
                  hd: Css.borderRadius(Css.px(5)),
                  tl: {
                    hd: Css.border(Css.px(0), "none", Css.currentColor),
                    tl: /* [] */0
                  }
                }
              }
            });
}

var Styles = {
  bold: bold,
  noop: noop,
  token: token
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
          pct_match: word.length === 0 ? 0 : matchedPrefix / word.length
        };
}

function map(fn, tok) {
  return $$Array.map((function (param) {
                return Curry._2(fn, param[0], param[1] ? bold : noop);
              }), tok.tokens);
}

function style(tok) {
  return token(tok.pct_match);
}

var StyledToken = {
  create: create,
  map: map,
  style: style
};

function match_(words, prefix) {
  return $$Array.map((function (w) {
                return create(w, Words$Avocardo.max_prefix(w, prefix));
              }), $$Array.map(PronounExercises$Avocardo.toString, words));
}

function style$1(word, pronouns, candidates) {
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
  style: style$1
};

function Token(Props) {
  var tok = Props.tok;
  return React.createElement("button", {
              style: token(tok.pct_match)
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
