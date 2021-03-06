// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Caml_string = require("rescript/lib/js/caml_string.js");

var normalize = (function(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      });

function max_prefix_iterator(a, b, _idx) {
  while(true) {
    var idx = _idx;
    if (a.length <= idx || b.length <= idx) {
      return idx;
    }
    if (Caml_string.get(a, idx) !== Caml_string.get(b, idx)) {
      return idx;
    }
    _idx = idx + 1 | 0;
    continue ;
  };
}

function max_prefix(a, b) {
  return max_prefix_iterator(normalize(a), normalize(b), 0);
}

function is_match(a, b) {
  var match = normalize(a);
  var match$1 = normalize(b);
  if (match.length === match$1.length) {
    return max_prefix(match, match$1) === match.length;
  } else {
    return false;
  }
}

exports.normalize = normalize;
exports.max_prefix_iterator = max_prefix_iterator;
exports.max_prefix = max_prefix;
exports.is_match = is_match;
/* No side effect */
