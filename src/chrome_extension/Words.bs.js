// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Caml_string = require("bs-platform/lib/js/caml_string.js");

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
  return max_prefix_iterator(normalize(a), b, 0);
}

function is_match(a, b) {
  return max_prefix(a, b) === a.length;
}

exports.normalize = normalize;
exports.max_prefix_iterator = max_prefix_iterator;
exports.max_prefix = max_prefix;
exports.is_match = is_match;
/* No side effect */
