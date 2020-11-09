// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var ReactDom = require("react-dom");
var Card$Avocardo = require("./Card.bs.js");
var Timer$Avocardo = require("./Timer.bs.js");
var Suspendable$Avocardo = require("./Suspendable.bs.js");
var Translation$Avocardo = require("./Translation.bs.js");

function UI$Wait(Props) {
  var wait = Props.wait;
  Curry._1(wait.read, undefined);
  return null;
}

var Wait = {
  make: UI$Wait
};

function fetchExercise(param) {
  return Suspendable$Avocardo.make(Translation$Avocardo.getExercise(undefined));
}

function delay(param) {
  return Suspendable$Avocardo.make(Timer$Avocardo.waitMS(500));
}

function UI$App(Props) {
  var match = React.useState(function () {
        return Suspendable$Avocardo.make(Timer$Avocardo.waitMS(500));
      });
  var setWait = match[1];
  var match$1 = React.useState(function () {
        return Suspendable$Avocardo.make(Translation$Avocardo.getExercise(undefined));
      });
  var setExercise = match$1[1];
  return React.createElement(React.Suspense, {
              children: null,
              fallback: "Loading..."
            }, React.createElement(UI$Wait, {
                  wait: match[0]
                }), React.createElement(Card$Avocardo.make, {
                  exercise: match$1[0],
                  next: (function (param) {
                      Curry._1(setWait, (function (param) {
                              return Suspendable$Avocardo.make(Timer$Avocardo.waitMS(500));
                            }));
                      return Curry._1(setExercise, (function (param) {
                                    return Suspendable$Avocardo.make(Translation$Avocardo.getExercise(undefined));
                                  }));
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
exports.fetchExercise = fetchExercise;
exports.delay = delay;
exports.App = App;
/* root Not a pure module */
