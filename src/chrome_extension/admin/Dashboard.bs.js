// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("rescript/lib/js/curry.js");
var React = require("react");
var $$Promise = require("reason-promise/src/js/promise.bs.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var RescriptRelay = require("rescript-relay/src/RescriptRelay.bs.js");
var RelayRuntime = require("relay-runtime");
var Glyph$Avocardo = require("../core/Glyph.bs.js");
var Hooks = require("react-relay/hooks");
var DashboardModuleCss = require("./Dashboard.module.css");
var RescriptRelay_Internal = require("rescript-relay/src/RescriptRelay_Internal.bs.js");
var AnswersOverTime$Avocardo = require("./AnswersOverTime.bs.js");
var SessionsOverTime$Avocardo = require("./SessionsOverTime.bs.js");
var DashboardQuery_graphql$Avocardo = require("../../__generated__/DashboardQuery_graphql.bs.js");

var styles = DashboardModuleCss;

function use(variables, fetchPolicy, fetchKey, networkCacheConfig, param) {
  var data = Hooks.useLazyLoadQuery(DashboardQuery_graphql$Avocardo.node, RescriptRelay_Internal.internal_cleanObjectFromUndefinedRaw(DashboardQuery_graphql$Avocardo.Internal.convertVariables(variables)), {
        fetchKey: fetchKey,
        fetchPolicy: RescriptRelay.mapFetchPolicy(fetchPolicy),
        networkCacheConfig: networkCacheConfig
      });
  return RescriptRelay_Internal.internal_useConvertedValue(DashboardQuery_graphql$Avocardo.Internal.convertResponse, data);
}

function useLoader(param) {
  var match = Hooks.useQueryLoader(DashboardQuery_graphql$Avocardo.node);
  var loadQueryFn = match[1];
  var loadQuery = React.useMemo((function () {
          return function (param, param$1, param$2, param$3) {
            return Curry._2(loadQueryFn, DashboardQuery_graphql$Avocardo.Internal.convertVariables(param), {
                        fetchPolicy: param$1,
                        networkCacheConfig: param$2
                      });
          };
        }), [loadQueryFn]);
  return [
          Caml_option.nullable_to_opt(match[0]),
          loadQuery,
          match[2]
        ];
}

function $$fetch(environment, variables, onResult, networkCacheConfig, fetchPolicy, param) {
  Hooks.fetchQuery(environment, DashboardQuery_graphql$Avocardo.node, DashboardQuery_graphql$Avocardo.Internal.convertVariables(variables), {
          networkCacheConfig: networkCacheConfig,
          fetchPolicy: RescriptRelay.mapFetchQueryFetchPolicy(fetchPolicy)
        }).subscribe({
        next: (function (res) {
            return Curry._1(onResult, {
                        TAG: 0,
                        _0: DashboardQuery_graphql$Avocardo.Internal.convertResponse(res),
                        [Symbol.for("name")]: "Ok"
                      });
          }),
        error: (function (err) {
            return Curry._1(onResult, {
                        TAG: 1,
                        _0: err,
                        [Symbol.for("name")]: "Error"
                      });
          })
      });
  
}

function fetchPromised(environment, variables, networkCacheConfig, fetchPolicy, param) {
  return $$Promise.map(Hooks.fetchQuery(environment, DashboardQuery_graphql$Avocardo.node, DashboardQuery_graphql$Avocardo.Internal.convertVariables(variables), {
                    networkCacheConfig: networkCacheConfig,
                    fetchPolicy: RescriptRelay.mapFetchQueryFetchPolicy(fetchPolicy)
                  }).toPromise(), (function (res) {
                return DashboardQuery_graphql$Avocardo.Internal.convertResponse(res);
              }));
}

function usePreloaded(queryRef, param) {
  var data = Hooks.usePreloadedQuery(DashboardQuery_graphql$Avocardo.node, queryRef);
  return RescriptRelay_Internal.internal_useConvertedValue(DashboardQuery_graphql$Avocardo.Internal.convertResponse, data);
}

function retain(environment, variables) {
  var operationDescriptor = RelayRuntime.createOperationDescriptor(DashboardQuery_graphql$Avocardo.node, DashboardQuery_graphql$Avocardo.Internal.convertVariables(variables));
  return environment.retain(operationDescriptor);
}

var Query = {
  Types: undefined,
  use: use,
  useLoader: useLoader,
  $$fetch: $$fetch,
  fetchPromised: fetchPromised,
  usePreloaded: usePreloaded,
  retain: retain
};

function Dashboard$Card(Props) {
  var children = Props.children;
  var title = Props.title;
  return React.createElement("div", {
              className: styles.card
            }, React.createElement("div", {
                  className: styles["card-title"]
                }, title), React.createElement("div", {
                  className: styles["card-body"]
                }, children));
}

var Card = {
  make: Dashboard$Card
};

function Dashboard(Props) {
  var match = use(undefined, undefined, undefined, undefined, undefined);
  var getAdminProfile = match.getAdminProfile;
  return React.createElement("div", {
              className: styles.root
            }, React.createElement("div", {
                  className: styles.header
                }, React.createElement("span", {
                      className: styles["header-glyph"]
                    }, React.createElement(Glyph$Avocardo.make, {
                          variant: /* Avocado */3
                        })), "Avocardo Admin / Dashboard"), React.createElement(Dashboard$Card, {
                  children: React.createElement(React.Suspense, {
                        children: React.createElement(AnswersOverTime$Avocardo.make, {
                              fragmentRef: getAdminProfile.fragmentRefs
                            }),
                        fallback: null
                      }),
                  title: "Answers over time"
                }), React.createElement(Dashboard$Card, {
                  children: React.createElement(React.Suspense, {
                        children: React.createElement(SessionsOverTime$Avocardo.make, {
                              fragmentRef: getAdminProfile.fragmentRefs
                            }),
                        fallback: null
                      }),
                  title: "Sessions over time"
                }));
}

var make = Dashboard;

exports.styles = styles;
exports.Query = Query;
exports.Card = Card;
exports.make = make;
/* styles Not a pure module */
