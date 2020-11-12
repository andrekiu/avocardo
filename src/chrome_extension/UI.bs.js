// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css-dom/src/Css.js");
var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var ReactDom = require("react-dom");
var Card$Avocardo = require("./Card.bs.js");
var Timer$Avocardo = require("./Timer.bs.js");
var Suspendable$Avocardo = require("./Suspendable.bs.js");
var ExerciseQueryManager$Avocardo = require("./ExerciseQueryManager.bs.js");

function UI$Wait(Props) {
  var wait = Props.wait;
  Curry._1(wait.read, undefined);
  return null;
}

var Wait = {
  make: UI$Wait
};

function delay(param) {
  return Suspendable$Avocardo.make(Timer$Avocardo.waitMS(500));
}

var app = Css.style({
      hd: Css.border({
            NAME: "px",
            VAL: 1
          }, "solid", "currentColor"),
      tl: {
        hd: Css.height({
              NAME: "px",
              VAL: 200
            }),
        tl: {
          hd: Css.width({
                NAME: "px",
                VAL: 200
              }),
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
                hd: Css.gridGap({
                      NAME: "px",
                      VAL: 10
                    }),
                tl: {
                  hd: Css.gridAutoRows({
                        NAME: "minmax",
                        VAL: [
                          {
                            NAME: "px",
                            VAL: 50
                          },
                          "auto"
                        ]
                      }),
                  tl: /* [] */0
                }
              }
            }
          }
        }
      }
    });

var center = Css.style({
      hd: Css.gridColumn(2, 2),
      tl: {
        hd: Css.gridRow(2, 2),
        tl: /* [] */0
      }
    });

var Styles = {
  app: app,
  center: center
};

function UI$Shimmer(Props) {
  return React.createElement("div", {
              style: app
            }, React.createElement("span", {
                  style: center
                }, "Loading..."));
}

var Shimmer = {
  make: UI$Shimmer
};

var style = Css.style({
      hd: Css.cursor(Css.pointer),
      tl: /* [] */0
    });

function UI$Filter(Props) {
  var filter = Props.filter;
  var fails = Props.fails;
  var onChangeFilter = Props.onChangeFilter;
  if (List.length(fails) === 0) {
    return null;
  } else {
    return React.createElement("div", {
                style: style,
                onClick: (function (param) {
                    if (filter === /* Any */0) {
                      return Curry._1(onChangeFilter, /* JustFails */1);
                    } else {
                      return Curry._1(onChangeFilter, /* Any */0);
                    }
                  })
              }, List.length(fails), filter === /* Any */0 ? String.fromCodePoint(128293) : String.fromCodePoint(128584));
  }
}

var Filter = {
  style: style,
  make: UI$Filter
};

function UI$App(Props) {
  var match = React.useState(function () {
        return Suspendable$Avocardo.make(Timer$Avocardo.waitMS(500));
      });
  var setWait = match[1];
  var match$1 = React.useState(function () {
        return /* Any */0;
      });
  var setFilter = match$1[1];
  var filter = match$1[0];
  var match$2 = React.useState(function () {
        return ExerciseQueryManager$Avocardo.make(undefined);
      });
  var setQuery = match$2[1];
  var response = match$2[0];
  return React.createElement(React.Suspense, {
              children: null,
              fallback: React.createElement(UI$Shimmer, {})
            }, React.createElement(UI$Wait, {
                  wait: match[0]
                }), React.createElement(Card$Avocardo.make, {
                  exercise: response.exercise,
                  next: (function (param) {
                      Curry._1(setWait, (function (param) {
                              return Suspendable$Avocardo.make(Timer$Avocardo.waitMS(500));
                            }));
                      return Curry._1(setQuery, (function (qm) {
                                    return ExerciseQueryManager$Avocardo.preloadQuery(qm, filter);
                                  }));
                    }),
                  storeStatus: (function (e, didSucceed) {
                      if (filter) {
                        if (didSucceed) {
                          Curry._1(setQuery, (function (qm) {
                                  return ExerciseQueryManager$Avocardo.removeFail(qm, e);
                                }));
                          if (List.length(response.fails) === 1) {
                            return Curry._1(setFilter, (function (param) {
                                          return /* Any */0;
                                        }));
                          } else {
                            return ;
                          }
                        } else {
                          return ;
                        }
                      } else if (didSucceed) {
                        return ;
                      } else {
                        return Curry._1(setQuery, (function (qm) {
                                      return ExerciseQueryManager$Avocardo.appendFail(qm, e);
                                    }));
                      }
                    }),
                  filter: React.createElement(UI$Filter, {
                        filter: filter,
                        fails: response.fails,
                        onChangeFilter: (function (f) {
                            Curry._1(setFilter, (function (param) {
                                    return f;
                                  }));
                            return Curry._1(setQuery, (function (qm) {
                                          return ExerciseQueryManager$Avocardo.preloadQuery(qm, f);
                                        }));
                          })
                      })
                }));
}

var App = {
  make: UI$App
};

var root = document.querySelector("#root");

if (!(root == null)) {
  ReactDom.render(React.createElement(UI$App, {}), root);
}

exports.Wait = Wait;
exports.delay = delay;
exports.Styles = Styles;
exports.Shimmer = Shimmer;
exports.Filter = Filter;
exports.App = App;
/* app Not a pure module */
