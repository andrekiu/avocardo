// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var List = require("rescript/lib/js/list.js");
var Curry = require("rescript/lib/js/curry.js");
var React = require("react");
var Card$Avocardo = require("./Card.bs.js");
var UIModuleCss = require("./UI.module.css");
var Shimmer$Avocardo = require("./Shimmer.bs.js");
var ExerciseQueryManager$Avocardo = require("./ExerciseQueryManager.bs.js");

var style = UIModuleCss;

function UI$Filter(Props) {
  var filter = Props.filter;
  var fails = Props.fails;
  var onChangeFilter = Props.onChangeFilter;
  if (List.length(fails) === 0) {
    return null;
  } else {
    return React.createElement("div", {
                className: style.filter,
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
              fallback: React.createElement(Shimmer$Avocardo.make, {})
            });
}

var App = {
  make: UI$App
};

exports.Filter = Filter;
exports.App = App;
/* style Not a pure module */
