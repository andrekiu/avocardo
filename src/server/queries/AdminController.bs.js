// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var MySql2 = require("bs-mysql2/src/MySql2.bs.js");
var DB$Avocardo = require("../db/DB.bs.js");

function genAnswersOverTime(range) {
  var where = range === "LAST_30_DAYS" ? "where answered_time between now() - interval 30 day and now()" : "";
  return new Promise((function (resolve, reject) {
                return DB$Avocardo.withConnection(function (conn) {
                            return MySql2.execute(conn, "\n        select DATE(answered_time) as ds, COUNT(answered_time) as value\n          from answers \n          " + where + "\n          group by ds\n          order by ds asc\n        ", undefined, (function (msg) {
                                          var variant = msg.NAME;
                                          if (variant === "Select") {
                                            return resolve(MySql2.Select.rows(msg.VAL));
                                          } else if (variant === "Mutation") {
                                            return reject({
                                                        RE_EXN_ID: "Failure",
                                                        _1: "UNEXPECTED_MUTATION"
                                                      });
                                          } else {
                                            return reject(MySql2.Exn.toExn(msg.VAL));
                                          }
                                        }));
                          });
              }));
}

function genSessionsOverTime(range) {
  var where = range === "LAST_30_DAYS" ? "where answered_time between now() - interval 30 day and now()" : "";
  return new Promise((function (resolve, reject) {
                return DB$Avocardo.withConnection(function (conn) {
                            return MySql2.execute(conn, "\n        select DATE(answered_time) as ds, COUNT(DISTINCT fingerprint) as value\n          from answers \n          " + where + "\n          group by ds\n          order by ds asc\n        ", undefined, (function (msg) {
                                          var variant = msg.NAME;
                                          if (variant === "Select") {
                                            return resolve(MySql2.Select.rows(msg.VAL));
                                          } else if (variant === "Mutation") {
                                            return reject({
                                                        RE_EXN_ID: "Failure",
                                                        _1: "UNEXPECTED_MUTATION"
                                                      });
                                          } else {
                                            return reject(MySql2.Exn.toExn(msg.VAL));
                                          }
                                        }));
                          });
              }));
}

function genFeedbackOverTime(range) {
  var where = range === "LAST_30_DAYS" ? "where created_time between now() - interval 30 day and now()" : "";
  return new Promise((function (resolve, reject) {
                return DB$Avocardo.withConnection(function (conn) {
                            return MySql2.execute(conn, "\n        select DATE(created_time) as ds, COUNT(created_time) as value\n          from feedback \n          " + where + "\n          group by ds\n          order by ds asc\n        ", undefined, (function (msg) {
                                          var variant = msg.NAME;
                                          if (variant === "Select") {
                                            return resolve(MySql2.Select.rows(msg.VAL));
                                          } else if (variant === "Mutation") {
                                            return reject({
                                                        RE_EXN_ID: "Failure",
                                                        _1: "UNEXPECTED_MUTATION"
                                                      });
                                          } else {
                                            return reject(MySql2.Exn.toExn(msg.VAL));
                                          }
                                        }));
                          });
              }));
}

exports.genAnswersOverTime = genAnswersOverTime;
exports.genSessionsOverTime = genSessionsOverTime;
exports.genFeedbackOverTime = genFeedbackOverTime;
/* MySql2 Not a pure module */
