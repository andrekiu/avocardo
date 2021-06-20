// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var $$Array = require("rescript/lib/js/array.js");
var Curry = require("rescript/lib/js/curry.js");
var React = require("react");
var $$String = require("rescript/lib/js/string.js");
var Caml_array = require("rescript/lib/js/caml_array.js");
var Cx$Avocardo = require("./core/Cx.bs.js");
var Token$Avocardo = require("./Token.bs.js");
var Words$Avocardo = require("./Words.bs.js");
var Filter$Avocardo = require("./Filter.bs.js");
var Prompt$Avocardo = require("./Prompt.bs.js");
var CardModuleCss = require("./Card.module.css");
var Keyboard$Avocardo = require("./hooks/Keyboard.bs.js");
var IndexModuleCss = require("./Index.module.css");

var style = CardModuleCss;

function contains(translations, w) {
  return $$Array.exists((function (t) {
                if (t.TAG === /* Right */0) {
                  return Words$Avocardo.is_match(t._0, w);
                } else {
                  return false;
                }
              }), translations);
}

function solution(exercise) {
  var findRight = function (opts, _idx) {
    while(true) {
      var idx = _idx;
      var str = Caml_array.get(opts, idx);
      if (str.TAG === /* Right */0) {
        return str._0;
      }
      _idx = idx + 1 | 0;
      continue ;
    };
  };
  return findRight(exercise.pronouns, 0) + (" " + findRight(exercise.nouns, 0));
}

function solved(selection, exercise) {
  var tokens = $$String.split_on_char(/* ' ' */32, $$String.trim(selection));
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

function Card$Result(Props) {
  var exercise = Props.exercise;
  return React.createElement("div", {
              className: style.result
            }, React.createElement("div", {
                  className: style["result-quiz"]
                }, exercise.quiz), React.createElement("div", {
                  className: style["result-solution"]
                }, solution(exercise)));
}

var Result = {
  make: Card$Result
};

function Card$Evaluation(Props) {
  var selection = Props.selection;
  var exercise = Props.exercise;
  return React.createElement("div", {
              className: Cx$Avocardo.join([
                    style.app,
                    style.appgrid
                  ])
            }, solved(selection, exercise) ? React.createElement(React.Fragment, undefined, React.createElement("span", {
                        className: style.result,
                        id: "correct"
                      }, "You got it!"), React.createElement("img", {
                        className: style["result-avocado"],
                        src: "/img/success.jpg"
                      })) : React.createElement(React.Fragment, undefined, React.createElement(Card$Result, {
                        exercise: exercise
                      }), React.createElement("img", {
                        className: style["result-avocado"],
                        id: "incorrect",
                        src: "/img/failure.jpg"
                      })));
}

var Evaluation = {
  make: Card$Evaluation
};

function Card$FilterImpl(Props) {
  var onChangeFilter = Props.onChangeFilter;
  var filter = Props.filter;
  var filterFragment = Props.filterFragment;
  var className = Props.className;
  return React.createElement(React.Suspense, {
              children: React.createElement(Filter$Avocardo.make, {
                    fails: filterFragment,
                    filter: filter,
                    onChangeFilter: onChangeFilter,
                    className: className
                  }),
              fallback: React.createElement("span", undefined, "Loading...")
            });
}

var FilterImpl = {
  make: Card$FilterImpl
};

function reduce_quiz(state, action) {
  if (typeof action === "number") {
    if (action !== 0) {
      if (state.TAG === /* Solving */0) {
        return {
                TAG: 0,
                _0: "",
                [Symbol.for("name")]: "Solving"
              };
      } else {
        return state;
      }
    } else if (state.TAG === /* Solving */0) {
      return {
              TAG: 1,
              _0: state._0,
              [Symbol.for("name")]: "Veredict"
            };
    } else {
      return {
              TAG: 0,
              _0: "",
              [Symbol.for("name")]: "Solving"
            };
    }
  } else if (state.TAG === /* Solving */0) {
    return {
            TAG: 0,
            _0: state._0 + action._0,
            [Symbol.for("name")]: "Solving"
          };
  } else {
    return state;
  }
}

var filterStyle = IndexModuleCss;

function Card$CardImpl(Props) {
  var exercise = Props.exercise;
  var next = Props.next;
  var storeStatus = Props.storeStatus;
  var filter = Props.filter;
  var onChangeFilter = Props.onChangeFilter;
  var filterFragment = Props.filterFragment;
  var match = React.useState(function () {
        return {
                TAG: 0,
                _0: "",
                [Symbol.for("name")]: "Solving"
              };
      });
  var setQuiz = match[1];
  var quiz = match[0];
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
              if (quiz.TAG === /* Solving */0) {
                if (match.TAG !== /* Solving */0) {
                  Curry._2(storeStatus, exercise, solved(match._0, exercise));
                }
                
              } else if (match.TAG === /* Solving */0) {
                Curry._1(next, undefined);
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
  if (quiz.TAG !== /* Solving */0) {
    return React.createElement(Card$Evaluation, {
                selection: quiz._0,
                exercise: exercise
              });
  }
  var selection = quiz._0;
  var match$1 = Token$Avocardo.StyledWords.style(selection, exercise.pronouns, exercise.nouns);
  return React.createElement("div", {
              className: Cx$Avocardo.join([
                    style.app,
                    style.appgrid
                  ])
            }, React.createElement("div", {
                  className: style.filter
                }, React.createElement(Card$FilterImpl, {
                      onChangeFilter: onChangeFilter,
                      filter: filter,
                      filterFragment: filterFragment,
                      className: filterStyle.filter
                    })), React.createElement("div", {
                  className: style.challenge,
                  id: "challenge"
                }, exercise.quiz), React.createElement("div", {
                  className: style.input
                }, selection, React.createElement(Prompt$Avocardo.make, {})), React.createElement("div", {
                  className: style.options
                }, React.createElement("div", {
                      className: style.column
                    }, $$Array.map((function (tok) {
                            return React.createElement(Token$Avocardo.make, {
                                        tok: tok
                                      });
                          }), match$1[0])), React.createElement("div", {
                      className: style.column
                    }, $$Array.map((function (tok) {
                            return React.createElement(Token$Avocardo.make, {
                                        tok: tok
                                      });
                          }), match$1[1]))));
}

var CardImpl = {
  filterStyle: filterStyle,
  make: Card$CardImpl
};

function Card$OutOfExercises(Props) {
  var filter = Props.filter;
  var onChangeFilter = Props.onChangeFilter;
  var filterFragment = Props.filterFragment;
  return React.createElement("div", {
              className: Cx$Avocardo.join([
                    style.app,
                    style.appflex
                  ])
            }, React.createElement("span", {
                  className: style.emptyquiz
                }, filter === /* Any */0 ? React.createElement("div", undefined, "There are no more exercises in the library, you are on fire!") : React.createElement(React.Fragment, undefined, React.createElement("div", undefined, "Congratulations!"), React.createElement("div", undefined, "You have cleared all your misses!"), React.createElement("div", {
                            className: style["emptyquiz-calltoaction"]
                          }, React.createElement(Card$FilterImpl, {
                                onChangeFilter: onChangeFilter,
                                filter: filter,
                                filterFragment: filterFragment,
                                className: style["emptyquiz-emoji"]
                              })))));
}

var OutOfExercises = {
  make: Card$OutOfExercises
};

function Card(Props) {
  var exercise = Props.exercise;
  var next = Props.next;
  var storeStatus = Props.storeStatus;
  var filter = Props.filter;
  var onChangeFilter = Props.onChangeFilter;
  var filterFragment = Props.filterFragment;
  if (exercise !== undefined) {
    return React.createElement(Card$CardImpl, {
                exercise: exercise,
                next: next,
                storeStatus: storeStatus,
                filter: filter,
                onChangeFilter: onChangeFilter,
                filterFragment: filterFragment
              });
  } else {
    return React.createElement(Card$OutOfExercises, {
                filter: filter,
                onChangeFilter: onChangeFilter,
                filterFragment: filterFragment
              });
  }
}

var make = Card;

exports.style = style;
exports.ExerciseSolver = ExerciseSolver;
exports.Result = Result;
exports.Evaluation = Evaluation;
exports.FilterImpl = FilterImpl;
exports.reduce_quiz = reduce_quiz;
exports.CardImpl = CardImpl;
exports.OutOfExercises = OutOfExercises;
exports.make = make;
/* style Not a pure module */
