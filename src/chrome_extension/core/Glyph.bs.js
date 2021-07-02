// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var React = require("react");
var Belt_Option = require("rescript/lib/js/belt_Option.js");
var Cx$Avocardo = require("./Cx.bs.js");

function getContent(v) {
  switch (v) {
    case /* Fire */0 :
        return String.fromCodePoint(128293);
    case /* Monkey */1 :
        return String.fromCodePoint(128584);
    case /* Skip */2 :
        return String.fromCodePoint(9197);
    case /* Avocado */3 :
        return String.fromCodePoint(129361);
    
  }
}

function Glyph(Props) {
  var variant = Props.variant;
  var className = Props.className;
  return React.createElement("span", {
              className: Belt_Option.getWithDefault(className, Cx$Avocardo.noop)
            }, getContent(variant));
}

var make = Glyph;

exports.getContent = getContent;
exports.make = make;
/* react Not a pure module */
