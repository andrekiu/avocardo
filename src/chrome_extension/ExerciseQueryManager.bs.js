// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Answer$Avocardo = require("../server/answers/Answer.bs.js");
var Suspendable$Avocardo = require("./Suspendable.bs.js");
var Translation$Avocardo = require("./Translation.bs.js");

function getExercise(qm, filter) {
  if (!filter) {
    return Suspendable$Avocardo.make(Translation$Avocardo.getExercise(undefined));
  }
  var shuffled = Belt_Array.shuffle($$Array.of_list(qm.fails));
  return Suspendable$Avocardo.$$const(Caml_array.caml_array_get(shuffled, 0));
}

function saveAnswer(qm, e, didSucceed) {
  return Translation$Avocardo.saveAnswer(Answer$Avocardo.Encode.answer({
                  fingerprint: qm.fingerprint,
                  question_id: e.id,
                  assesment: didSucceed ? /* Correct */0 : /* Incorrect */1
                }));
}

function make(fingerprint) {
  return {
          fingerprint: fingerprint,
          fails: /* [] */0,
          exercise: Suspendable$Avocardo.make(Translation$Avocardo.getExercise(undefined))
        };
}

function appendFail(qm, f) {
  return {
          fingerprint: qm.fingerprint,
          fails: {
            hd: f,
            tl: qm.fails
          },
          exercise: qm.exercise
        };
}

function removeFail(qm, f) {
  return {
          fingerprint: qm.fingerprint,
          fails: List.filter(function (e) {
                  return e.quiz !== f.quiz;
                })(qm.fails),
          exercise: qm.exercise
        };
}

function preloadQuery(qm, f) {
  return {
          fingerprint: qm.fingerprint,
          fails: qm.fails,
          exercise: getExercise(qm, f)
        };
}

exports.getExercise = getExercise;
exports.saveAnswer = saveAnswer;
exports.make = make;
exports.appendFail = appendFail;
exports.removeFail = removeFail;
exports.preloadQuery = preloadQuery;
/* No side effect */
