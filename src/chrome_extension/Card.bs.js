// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css-dom/src/Css.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var $$String = require("bs-platform/lib/js/string.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Token$Avocardo = require("./Token.bs.js");
var Words$Avocardo = require("./Words.bs.js");
var Keyboard$Avocardo = require("./hooks/Keyboard.bs.js");

var app = Css.style({
      hd: Css.height(Css.px(200)),
      tl: {
        hd: Css.width(Css.px(200)),
        tl: /* [] */0
      }
    });

var challenge = Css.style({
      hd: Css.textAlign(Css.center),
      tl: {
        hd: Css.height(Css.px(25)),
        tl: {
          hd: Css.verticalAlign(Css.middle),
          tl: {
            hd: Css.marginTop(Css.px(25)),
            tl: /* [] */0
          }
        }
      }
    });

var options = Css.style({
      hd: Css.display("flex"),
      tl: {
        hd: Css.width(Css.pct(100)),
        tl: {
          hd: Css.height(Css.px(150)),
          tl: {
            hd: Css.justifyContent("spaceEvenly"),
            tl: /* [] */0
          }
        }
      }
    });

var column = Css.style({
      hd: Css.display("flex"),
      tl: {
        hd: Css.flexDirection("column"),
        tl: {
          hd: Css.justifyContent("spaceEvenly"),
          tl: /* [] */0
        }
      }
    });

var center = Css.style({
      hd: Css.display(Css.inlineBlock),
      tl: {
        hd: Css.margin2({
              NAME: "percent",
              VAL: 45
            }, {
              NAME: "percent",
              VAL: 25
            }),
        tl: {
          hd: Css.textAlign(Css.center),
          tl: /* [] */0
        }
      }
    });

var Styles = {
  app: app,
  challenge: challenge,
  options: options,
  column: column,
  center: center
};

function contains(translations, w) {
  return $$Array.exists((function (t) {
                if (t.TAG) {
                  return false;
                } else {
                  return Words$Avocardo.is_match(t._0, w);
                }
              }), translations);
}

function solved(selection, exercise) {
  var tokens = $$String.split_on_char(/* " " */32, selection);
  if (!tokens) {
    return false;
  }
  var match = tokens.tl;
  if (match && !(match.tl || !contains(exercise.pronouns, tokens.hd))) {
    return contains(exercise.nouns, match.hd);
  } else {
    return false;
  }
}

function solution(exercise) {
  var findRight = function (opts, _idx) {
    while(true) {
      var idx = _idx;
      var str = Caml_array.caml_array_get(opts, idx);
      if (!str.TAG) {
        return str._0;
      }
      _idx = idx + 1 | 0;
      continue ;
    };
  };
  return findRight(exercise.pronouns, 0) + (" " + findRight(exercise.nouns, 0));
}

function Card$Evaluation(Props) {
  var selection = Props.selection;
  var exercise = Props.exercise;
  var onNext = Props.onNext;
  return React.createElement("div", {
              style: app
            }, solved(selection, exercise) ? React.createElement("button", {
                    style: center,
                    onClick: (function (param) {
                        return Curry._1(onNext, undefined);
                      })
                  }, "Beautiful Pepper") : React.createElement(React.Fragment, undefined, React.createElement("div", {
                        style: center
                      }, React.createElement("div", undefined, exercise.quiz), React.createElement("div", undefined, solution(exercise)), React.createElement("button", {
                            onClick: (function (param) {
                                return Curry._1(onNext, undefined);
                              })
                          }, "Farty Pepper"))));
}

var Evaluation = {
  contains: contains,
  solved: solved,
  solution: solution,
  make: Card$Evaluation
};

function reduce_quiz(state, action) {
  if (typeof action === "number") {
    if (action !== 0) {
      if (state.TAG) {
        return state;
      } else {
        return {
                TAG: 0,
                _0: "",
                [Symbol.for("name")]: "Solving"
              };
      }
    } else if (state.TAG) {
      return {
              TAG: 0,
              _0: "",
              [Symbol.for("name")]: "Solving"
            };
    } else {
      return {
              TAG: 1,
              _0: state._0,
              [Symbol.for("name")]: "Veredict"
            };
    }
  } else if (state.TAG) {
    return state;
  } else {
    return {
            TAG: 0,
            _0: state._0 + action._0,
            [Symbol.for("name")]: "Solving"
          };
  }
}

function willRestartQuiz(cur, next) {
  if (cur.TAG && !next.TAG) {
    return true;
  } else {
    return false;
  }
}

function useReducer(getInitialState, reduce, next) {
  var match = React.useState(function () {
        return Curry._1(getInitialState, undefined);
      });
  var setState = match[1];
  var state = match[0];
  var dispatch = function (a) {
    return Curry._1(setState, (function (s) {
                  return Curry._2(reduce, s, a);
                }));
  };
  Keyboard$Avocardo.use(React.useCallback(function (c) {
            var a = {
              _0: c,
              [Symbol.for("name")]: "Char"
            };
            return Curry._1(setState, (function (s) {
                          return Curry._2(reduce, s, a);
                        }));
          }), React.useCallback((function (param) {
              if (willRestartQuiz(state, reduce_quiz(state, /* Enter */0))) {
                Curry._1(next, undefined);
              }
              return Curry._1(setState, (function (s) {
                            return Curry._2(reduce, s, /* Enter */0);
                          }));
            }), [state]), React.useCallback(function (param) {
            return Curry._1(setState, (function (s) {
                          return Curry._2(reduce, s, /* Delete */1);
                        }));
          }));
  return [
          state,
          dispatch
        ];
}

function Card(Props) {
  var exercise = Props.exercise;
  var next = Props.next;
  var match = useReducer((function (param) {
          return {
                  TAG: 0,
                  _0: "",
                  [Symbol.for("name")]: "Solving"
                };
        }), reduce_quiz, next);
  var dispatch = match[1];
  var quiz = match[0];
  var e = Curry._1(exercise.read, undefined);
  if (quiz.TAG) {
    return React.createElement(Card$Evaluation, {
                selection: quiz._0,
                exercise: e,
                onNext: (function (param) {
                    return Curry._1(dispatch, /* Enter */0);
                  })
              });
  }
  var selection = quiz._0;
  var match$1 = Token$Avocardo.StyledWords.style(selection, e.pronouns, e.nouns);
  return React.createElement("div", {
              style: app
            }, React.createElement("div", undefined, selection), React.createElement("div", {
                  style: challenge
                }, e.quiz), React.createElement("div", {
                  style: options
                }, React.createElement("div", {
                      style: column
                    }, $$Array.map((function (tok) {
                            return React.createElement(Token$Avocardo.make, {
                                        tok: tok
                                      });
                          }), match$1[0])), React.createElement("div", {
                      style: column
                    }, $$Array.map((function (tok) {
                            return React.createElement(Token$Avocardo.make, {
                                        tok: tok
                                      });
                          }), match$1[1]))));
}

var make = Card;

exports.Styles = Styles;
exports.Evaluation = Evaluation;
exports.reduce_quiz = reduce_quiz;
exports.willRestartQuiz = willRestartQuiz;
exports.useReducer = useReducer;
exports.make = make;
/* app Not a pure module */
