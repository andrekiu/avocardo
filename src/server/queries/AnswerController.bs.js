// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var MySql2 = require("bs-mysql2/src/MySql2.bs.js");
var Caml_array = require("rescript/lib/js/caml_array.js");
var DB$Avocardo = require("../db/DB.bs.js");

function genInsertAnswer(answer) {
  return new Promise((function (resolve, reject) {
                var answeredTime = Caml_array.get(new Date().toISOString().replace("T", " ").split("."), 0);
                var statement = "\n      insert into answers (fingerprint, question_id, assesment, answered_time) \n      values ('" + answer.fingerprint + "', '" + answer.quiz_id + "', '" + (
                  answer.didSucceed ? "CORRECT" : "INCORRECT"
                ) + "', '" + answeredTime + "')\n    ";
                return DB$Avocardo.withConnection(function (conn) {
                            return MySql2.execute(conn, statement, undefined, (function (msg) {
                                          var variant = msg.NAME;
                                          if (variant === "Select") {
                                            return reject({
                                                        RE_EXN_ID: "Failure",
                                                        _1: "UNEXPECTED_SELECT"
                                                      });
                                          } else if (variant === "Mutation") {
                                            return resolve(MySql2.Mutation.insertId(msg.VAL));
                                          } else {
                                            return reject(MySql2.Exn.toExn(msg.VAL));
                                          }
                                        }));
                          });
              }));
}

exports.genInsertAnswer = genInsertAnswer;
/* MySql2 Not a pure module */