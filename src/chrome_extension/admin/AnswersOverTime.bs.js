// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var $$Array = require("rescript/lib/js/array.js");
var React = require("react");
var Recharts = require("recharts");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Js_null_undefined = require("rescript/lib/js/js_null_undefined.js");
var Hooks = require("react-relay/hooks");
var ChartsModuleCss = require("./Charts.module.css");
var TimeSeries$Avocardo = require("./TimeSeries.bs.js");
var RescriptRelay_Internal = require("rescript-relay/src/RescriptRelay_Internal.bs.js");
var AnswersOverTime_graphql$Avocardo = require("../../__generated__/AnswersOverTime_graphql.bs.js");

var styles = ChartsModuleCss;

function use(fRef) {
  var data = Hooks.useFragment(AnswersOverTime_graphql$Avocardo.node, fRef);
  return RescriptRelay_Internal.internal_useConvertedValue(AnswersOverTime_graphql$Avocardo.Internal.convertFragment, data);
}

function useOpt(opt_fRef) {
  var fr = opt_fRef !== undefined ? Caml_option.some(Caml_option.valFromOption(opt_fRef)) : undefined;
  var nullableFragmentData = Hooks.useFragment(AnswersOverTime_graphql$Avocardo.node, fr !== undefined ? Js_null_undefined.fromOption(Caml_option.some(Caml_option.valFromOption(fr))) : null);
  var data = (nullableFragmentData == null) ? undefined : Caml_option.some(nullableFragmentData);
  return RescriptRelay_Internal.internal_useConvertedValue((function (rawFragment) {
                if (rawFragment !== undefined) {
                  return AnswersOverTime_graphql$Avocardo.Internal.convertFragment(rawFragment);
                }
                
              }), data);
}

var AnswersOverTimeFragment = {
  Types: undefined,
  use: use,
  useOpt: useOpt
};

function AnswersOverTime(Props) {
  var fragmentRef = Props.fragmentRef;
  var fragment = use(fragmentRef);
  var data = $$Array.map((function (row) {
          return {
                  ds: row.date,
                  value: row.val
                };
        }), TimeSeries$Avocardo.fillRows($$Array.map((function (row) {
                  return {
                          date: row.ds,
                          val: row.value
                        };
                }), fragment.answersOverTime)));
  return React.createElement("div", {
              className: styles.answers
            }, React.createElement(Recharts.ResponsiveContainer, {
                  children: React.createElement(Recharts.BarChart, {
                        data: data,
                        height: 300,
                        width: 800,
                        children: null
                      }, React.createElement(Recharts.CartesianGrid, {
                            strokeDasharray: "3 3"
                          }), React.createElement(Recharts.XAxis, {
                            dataKey: "ds"
                          }), React.createElement(Recharts.YAxis, {}), React.createElement(Recharts.Tooltip, {}), React.createElement(Recharts.Legend, {}), React.createElement(Recharts.Bar, {
                            dataKey: "value",
                            fill: "#8884d8"
                          }))
                }));
}

var make = AnswersOverTime;

exports.styles = styles;
exports.AnswersOverTimeFragment = AnswersOverTimeFragment;
exports.make = make;
/* styles Not a pure module */
