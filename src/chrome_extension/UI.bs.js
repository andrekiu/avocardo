// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css-dom/src/Css.js");
var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var ReactDom = require("react-dom");
var Card$Avocardo = require("./Card.bs.js");
var Timer$Avocardo = require("./Timer.bs.js");
var Fingerprint$Avocardo = require("./auth/Fingerprint.bs.js");
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
      tl: {
        hd: Css.padding2(Css.px(10), Css.px(15)),
        tl: {
          hd: Css.textAlign("right"),
          tl: /* [] */0
        }
      }
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
              }, filter === /* Any */0 ? String.fromCodePoint(128293) : String.fromCodePoint(128584), " ", List.length(fails));
  }
}

var Filter = {
  style: style,
  make: UI$Filter
};

function UI$App(Props) {
  var initialQM = Props.initialQM;
  var match = React.useState(function () {
        return /* Any */0;
      });
  var setFilter = match[1];
  var filter = match[0];
  var match$1 = React.useState(initialQM);
  var setQuery = match$1[1];
  var qm = match$1[0];
  var next = React.useCallback((function (param) {
          return Curry._1(setQuery, ExerciseQueryManager$Avocardo.preloadQuery(qm, filter));
        }), [
        qm,
        filter
      ]);
  return React.createElement(React.Suspense, {
              children: React.createElement(Card$Avocardo.make, {
                    exercise: qm.exercise,
                    next: next,
                    storeStatus: (function (e, didSucceed) {
                        ExerciseQueryManager$Avocardo.saveAnswer(qm, e, didSucceed);
                        if (filter) {
                          if (didSucceed) {
                            Curry._1(setQuery, ExerciseQueryManager$Avocardo.removeFail(qm, e));
                            if (List.length(qm.fails) === 1) {
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
                          return Curry._1(setQuery, ExerciseQueryManager$Avocardo.appendFail(qm, e));
                        }
                      }),
                    filter: React.createElement(UI$Filter, {
                          filter: filter,
                          fails: qm.fails,
                          onChangeFilter: (function (f) {
                              Curry._1(setFilter, (function (param) {
                                      return f;
                                    }));
                              return Curry._1(setQuery, ExerciseQueryManager$Avocardo.preloadQuery(qm, f));
                            })
                        })
                  }),
              fallback: React.createElement(UI$Shimmer, {})
            });
}

var App = {
  make: UI$App
};

Fingerprint$Avocardo.get(function (fingerprint) {
      var root = document.querySelector("#root");
      if (!(root == null)) {
        ReactDom.unstable_createRoot(root).render(React.createElement(UI$App, {
                  initialQM: ExerciseQueryManager$Avocardo.make(fingerprint)
                }));
        return ;
      }
      
    });

exports.Wait = Wait;
exports.delay = delay;
exports.Styles = Styles;
exports.Shimmer = Shimmer;
exports.Filter = Filter;
exports.App = App;
/* app Not a pure module */
