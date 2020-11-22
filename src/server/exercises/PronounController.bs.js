// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Fs = require("fs");
var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var $$String = require("bs-platform/lib/js/string.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Caml_primitive = require("bs-platform/lib/js/caml_primitive.js");
var PronounExercises$Avocardo = require("./PronounExercises.bs.js");

function scramble(words, index) {
  var tokens = $$Array.map((function (w) {
          return List.nth($$String.split_on_char(/* " " */32, w), index);
        }), words);
  var answer = Caml_array.caml_array_get(tokens, 0);
  $$Array.sort(Caml_primitive.caml_string_compare, tokens);
  var iterator = function (_prev, _idx, _sum) {
    while(true) {
      var sum = _sum;
      var idx = _idx;
      var prev = _prev;
      if (tokens.length === idx) {
        return sum;
      }
      if (prev === Caml_array.caml_array_get(tokens, idx)) {
        _idx = idx + 1 | 0;
        continue ;
      }
      _sum = {
        hd: answer === Caml_array.caml_array_get(tokens, idx) ? ({
              TAG: 0,
              _0: Caml_array.caml_array_get(tokens, idx),
              [Symbol.for("name")]: "Right"
            }) : ({
              TAG: 1,
              _0: Caml_array.caml_array_get(tokens, idx),
              [Symbol.for("name")]: "Wrong"
            }),
        tl: sum
      };
      _idx = idx + 1 | 0;
      _prev = Caml_array.caml_array_get(tokens, idx);
      continue ;
    };
  };
  return Belt_Array.shuffle($$Array.of_list(iterator("~", 0, /* [] */0)));
}

function getPronounExercices(param) {
  var bigrams = Json_decode.dict((function (param) {
          return Json_decode.array(Json_decode.string, param);
        }), JSON.parse(Fs.readFileSync("src/server/db/bigrams.json", "utf8")));
  var __x = Js_dict.entries(bigrams);
  return $$Array.of_list($$Array.fold_left((function (sum, param) {
                    var opts = param[1];
                    return {
                            hd: {
                              quiz: param[0],
                              pronouns: scramble(opts, 0),
                              nouns: scramble(opts, 1)
                            },
                            tl: sum
                          };
                  }), /* [] */0, __x));
}

function jsonResponse(param) {
  return PronounExercises$Avocardo.Encode.exercise(PronounExercises$Avocardo.pickRandom(getPronounExercices(undefined)));
}

exports.scramble = scramble;
exports.getPronounExercices = getPronounExercices;
exports.jsonResponse = jsonResponse;
/* fs Not a pure module */