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
var Prompt$Avocardo = require("./Prompt.bs.js");
var Keyboard$Avocardo = require("./hooks/Keyboard.bs.js");

var app = Css.style({
      hd: Css.height(Css.px(200)),
      tl: {
        hd: Css.width(Css.px(200)),
        tl: {
          hd: Css.border({
                NAME: "px",
                VAL: 1
              }, "solid", "currentColor"),
          tl: {
            hd: Css.display("grid"),
            tl: {
              hd: Css.gridTemplateColumns({
                    hd: {
                      NAME: "repeat",
                      VAL: [
                        {
                          NAME: "num",
                          VAL: 3
                        },
                        {
                          NAME: "fr",
                          VAL: 1
                        }
                      ]
                    },
                    tl: /* [] */0
                  }),
              tl: {
                hd: Css.gridAutoRows({
                      NAME: "minmax",
                      VAL: [
                        {
                          NAME: "px",
                          VAL: 20
                        },
                        {
                          NAME: "px",
                          VAL: 20
                        }
                      ]
                    }),
                tl: /* [] */0
              }
            }
          }
        }
      }
    });

var input = Css.style({
      hd: Css.gridRow(3, 3),
      tl: {
        hd: Css.gridColumn(1, 4),
        tl: {
          hd: Css.textAlign(Css.center),
          tl: /* [] */0
        }
      }
    });

var challenge = Css.style({
      hd: Css.gridRow(2, 2),
      tl: {
        hd: Css.gridColumn(1, 4),
        tl: {
          hd: Css.textAlign(Css.center),
          tl: {
            hd: Css.fontWeight("bold"),
            tl: /* [] */0
          }
        }
      }
    });

var options = Css.style({
      hd: Css.gridRow(4, 10),
      tl: {
        hd: Css.gridColumn(1, 4),
        tl: {
          hd: Css.display("flex"),
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
          tl: {
            hd: Css.alignItems("center"),
            tl: /* [] */0
          }
        }
      }
    });

var center = Css.style({
      hd: Css.gridColumn(2, 2),
      tl: {
        hd: Css.gridRow(5, 7),
        tl: {
          hd: Css.height(Css.px(80)),
          tl: /* [] */0
        }
      }
    });

var correctResult = Css.style({
      hd: Css.gridColumn(2, 2),
      tl: {
        hd: Css.gridRow(3, 3),
        tl: {
          hd: Css.textAlign("center"),
          tl: {
            hd: Css.fontWeight("bold"),
            tl: {
              hd: Css.fontStyle("italic"),
              tl: /* [] */0
            }
          }
        }
      }
    });

var bold = Css.style({
      hd: Css.fontWeight("bold"),
      tl: /* [] */0
    });

var italic = Css.style({
      hd: Css.fontStyle("italic"),
      tl: /* [] */0
    });

var result = Css.style({
      hd: Css.gridColumn(2, 2),
      tl: {
        hd: Css.gridRow(3, 3),
        tl: {
          hd: Css.textAlign("center"),
          tl: /* [] */0
        }
      }
    });

var filter = Css.style({
      hd: Css.gridColumn(3, 3),
      tl: {
        hd: Css.gridRow(1, 1),
        tl: {
          hd: Css.textAlign("center"),
          tl: /* [] */0
        }
      }
    });

var Styles = {
  app: app,
  input: input,
  challenge: challenge,
  options: options,
  column: column,
  center: center,
  correctResult: correctResult,
  bold: bold,
  italic: italic,
  result: result,
  filter: filter
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

var ExerciseSolver = {
  contains: contains,
  solution: solution,
  solved: solved
};

function Card$Evaluation(Props) {
  var selection = Props.selection;
  var exercise = Props.exercise;
  return React.createElement("div", {
              style: app
            }, solved(selection, exercise) ? React.createElement(React.Fragment, undefined, React.createElement("span", {
                        style: correctResult
                      }, "You got it!"), React.createElement("img", {
                        style: center,
                        src: chrome.runtime.getURL("success.jpg")
                      })) : React.createElement(React.Fragment, undefined, React.createElement("div", {
                        style: result
                      }, React.createElement("div", {
                            style: bold
                          }, exercise.quiz), React.createElement("div", {
                            style: italic
                          }, solution(exercise))), React.createElement("img", {
                        style: center,
                        src: chrome.runtime.getURL("failure.jpg")
                      })));
}

var Evaluation = {
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

function willShowVeredict(cur, next) {
  if (cur.TAG || !next.TAG) {
    return false;
  } else {
    return true;
  }
}

function Card(Props) {
  var exercise = Props.exercise;
  var next = Props.next;
  var storeStatus = Props.storeStatus;
  var filter$1 = Props.filter;
  var match = React.useState(function () {
        return {
                TAG: 0,
                _0: "",
                [Symbol.for("name")]: "Solving"
              };
      });
  var setQuiz = match[1];
  var quiz = match[0];
  var e = Curry._1(exercise.read, undefined);
  Keyboard$Avocardo.use(React.useCallback(function (c) {
            var a = {
              _0: c,
              [Symbol.for("name")]: "Char"
            };
            return Curry._1(setQuiz, (function (s) {
                          return reduce_quiz(s, a);
                        }));
          }), React.useCallback((function (param) {
              var match = reduce_quiz(quiz, /* Enter */0);
              if (quiz.TAG) {
                if (!match.TAG) {
                  Curry._1(next, undefined);
                }
                
              } else if (match.TAG) {
                Curry._2(storeStatus, e, solved(match._0, e));
              }
              return Curry._1(setQuiz, (function (s) {
                            return reduce_quiz(s, /* Enter */0);
                          }));
            }), [
            quiz,
            next
          ]), React.useCallback(function (param) {
            return Curry._1(setQuiz, (function (s) {
                          return reduce_quiz(s, /* Delete */1);
                        }));
          }));
  if (quiz.TAG) {
    return React.createElement(Card$Evaluation, {
                selection: quiz._0,
                exercise: e
              });
  }
  var selection = quiz._0;
  var match$1 = Token$Avocardo.StyledWords.style(selection, e.pronouns, e.nouns);
  return React.createElement("div", {
              style: app
            }, React.createElement("div", {
                  style: filter
                }, filter$1), React.createElement("div", {
                  style: challenge
                }, e.quiz), React.createElement("div", {
                  style: input
                }, selection, React.createElement(Prompt$Avocardo.make, {})), React.createElement("div", {
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
exports.ExerciseSolver = ExerciseSolver;
exports.Evaluation = Evaluation;
exports.reduce_quiz = reduce_quiz;
exports.willRestartQuiz = willRestartQuiz;
exports.willShowVeredict = willShowVeredict;
exports.make = make;
/* app Not a pure module */
