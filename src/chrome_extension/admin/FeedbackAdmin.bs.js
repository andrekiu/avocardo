// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var React = require("react");
var DashboardModuleCss = require("./Dashboard.module.css");
var AdminRouteSelector$Avocardo = require("./AdminRouteSelector.bs.js");

var styles = DashboardModuleCss;

function FeedbackAdmin(Props) {
  return React.createElement("div", {
              className: styles.root
            }, React.createElement(AdminRouteSelector$Avocardo.make, {
                  route: "feedback"
                }));
}

var make = FeedbackAdmin;

exports.styles = styles;
exports.make = make;
/* styles Not a pure module */
