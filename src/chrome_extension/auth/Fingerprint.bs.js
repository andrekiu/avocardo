// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

function getFingerprint(param) {
  var randomPool = new Uint8Array(32);
  crypto.getRandomValues(randomPool);
  return $$Array.fold_left((function (sum, e) {
                return sum + e.toString(16);
              }), "", randomPool);
}

function sync(cb) {
  chrome.storage.sync.get("userid", (function (items) {
          var userid = items.userid;
          if (!(userid == null)) {
            return Curry._1(cb, Belt_Option.getExn((userid == null) ? undefined : Caml_option.some(userid)));
          }
          var hash = getFingerprint(undefined);
          chrome.storage.sync.set({
                userid: hash
              }, (function (param) {
                  return Curry._1(cb, hash);
                }));
          
        }));
  
}

var Internals = {
  getFingerprint: getFingerprint,
  sync: sync
};

var get = sync;

exports.Internals = Internals;
exports.get = get;
/* No side effect */
