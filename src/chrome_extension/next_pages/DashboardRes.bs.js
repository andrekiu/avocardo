// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("rescript/lib/js/curry.js");
var React = require("react");
var RescriptRelay = require("rescript-relay/src/RescriptRelay.bs.js");
var RelayEnv$Avocardo = require("../avocardo/RelayEnv.bs.js");
var Dashboard$Avocardo = require("../admin/Dashboard.bs.js");

function DashboardRes$P(Props) {
  var isServer = (function isServer() {
              return typeof window === 'undefined';
            });
  if (Curry._1(isServer, undefined)) {
    return null;
  } else {
    return React.createElement(Dashboard$Avocardo.make, {});
  }
}

var P = {
  make: DashboardRes$P
};

function $$default(param) {
  return React.createElement(React.Suspense, {
              children: React.createElement(RescriptRelay.Context.Provider.make, {
                    environment: RelayEnv$Avocardo.environment,
                    children: React.createElement(DashboardRes$P, {})
                  }),
              fallback: "Loading..."
            });
}

exports.P = P;
exports.$$default = $$default;
exports.default = $$default;
exports.__esModule = true;
/* react Not a pure module */
