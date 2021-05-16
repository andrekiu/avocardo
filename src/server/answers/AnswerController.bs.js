// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("rescript/lib/js/curry.js");
var MySql2 = require("bs-mysql2/src/MySql2.bs.js");
var Caml_array = require("rescript/lib/js/caml_array.js");
var DB$Avocardo = require("../db/DB.bs.js");
var Answer$Avocardo = require("./Answer.bs.js");
var RenderQuery$Requery = require("@adnelson/requery/src/RenderQuery.bs.js");
var QueryBuilder$Requery = require("@adnelson/requery/src/QueryBuilder.bs.js");

function genInsertAnswer(answer) {
  return new Promise((function (resolve, reject) {
                var statement = RenderQuery$Requery.Default.insert(undefined, undefined, QueryBuilder$Requery.into(Curry._1(QueryBuilder$Requery.tname, "answers"), QueryBuilder$Requery.insertOne((function (param) {
                                return {
                                        hd: [
                                          Curry._1(QueryBuilder$Requery.cname, "fingerprint"),
                                          QueryBuilder$Requery.string(param[0])
                                        ],
                                        tl: {
                                          hd: [
                                            Curry._1(QueryBuilder$Requery.cname, "question_id"),
                                            QueryBuilder$Requery.$$int(param[1])
                                          ],
                                          tl: {
                                            hd: [
                                              Curry._1(QueryBuilder$Requery.cname, "assesment"),
                                              QueryBuilder$Requery.string(param[2])
                                            ],
                                            tl: {
                                              hd: [
                                                Curry._1(QueryBuilder$Requery.cname, "answered_time"),
                                                QueryBuilder$Requery.string(Caml_array.get(new Date().toISOString().replace("T", " ").split("."), 0))
                                              ],
                                              tl: /* [] */0
                                            }
                                          }
                                        }
                                      };
                              }), [
                              answer.fingerprint,
                              answer.question_id,
                              Answer$Avocardo.Encode.assesmentToStr(answer.assesment)
                            ])));
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

function genSave(json) {
  return Promise.resolve(genInsertAnswer(Answer$Avocardo.Decode.answer(json)));
}

exports.genInsertAnswer = genInsertAnswer;
exports.genSave = genSave;
/* MySql2 Not a pure module */