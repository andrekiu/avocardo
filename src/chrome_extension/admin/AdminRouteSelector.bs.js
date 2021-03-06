// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("rescript/lib/js/curry.js");
var React = require("react");
var Router = require("next/router");
var UseLogoutJs = require("./useLogout.js").default;
var Glyph$Avocardo = require("../core/Glyph.bs.js");
var AdminRouteSelectorModuleCss = require("./AdminRouteSelector.module.css");

var styles = AdminRouteSelectorModuleCss;

function useLogout(prim) {
  return UseLogoutJs();
}

function AdminRouteSelector(Props) {
  var route = Props.route;
  var router = Router.useRouter();
  var match = UseLogoutJs();
  var logOut = match[1];
  return React.createElement("div", {
              className: styles.header
            }, React.createElement("span", undefined, React.createElement("span", {
                      className: styles["header-glyph"]
                    }, React.createElement(Glyph$Avocardo.make, {
                          variant: /* Avocado */3
                        })), React.createElement("span", undefined, "Avocardo Admin / ", React.createElement("select", {
                          defaultValue: route === "dashboard" ? "dashboard" : "feedback",
                          className: styles["header-select"],
                          onChange: (function (e) {
                              router.push("/admin/" + e.target.value);
                              
                            })
                        }, React.createElement("option", {
                              value: "dashboard"
                            }, "Dashboard"), React.createElement("option", {
                              value: "feedback"
                            }, "Feedback")))), React.createElement("span", {
                  className: styles["header-logout"],
                  onClick: (function (param) {
                      return Curry._1(logOut, undefined);
                    })
                }, match[0] ? "Login out..." : React.createElement(React.Fragment, undefined, React.createElement(Glyph$Avocardo.make, {
                            variant: /* VictoryHand */4
                          }), "Logout")));
}

var make = AdminRouteSelector;

exports.styles = styles;
exports.useLogout = useLogout;
exports.make = make;
/* styles Not a pure module */
