/* @generated */
%%raw("/* @generated */")
module Types = {
  @@ocaml.warning("-30")
  
  type enum_ChartTimeRange = private [>
    | #LAST_30_DAYS
    | #LIFETIME
    ]
  
  type enum_ChartTimeRange_input = [
    | #LAST_30_DAYS
    | #LIFETIME
    ]
  
  type rec response_getAdminProfile = {
    fragmentRefs: RescriptRelay.fragmentRefs<[ | #AnswersOverTime | #SessionsOverTime]>
  }
  type response = {
    getAdminProfile: response_getAdminProfile,
  }
  type rawResponse = response
  type refetchVariables = {
    range: option<[
    | #LAST_30_DAYS
    | #LIFETIME
    ]>,
  }
  let makeRefetchVariables = (
    ~range=?,
    ()
  ): refetchVariables => {
    range: range
  }
  
  type variables = {
    range: [
    | #LAST_30_DAYS
    | #LIFETIME
    ],
  }
}

module Internal = {
  type wrapResponseRaw
  let wrapResponseConverter: 
    Js.Dict.t<Js.Dict.t<Js.Dict.t<string>>> = 
    %raw(
      json`{"__root":{"getAdminProfile":{"f":""}}}`
    )
  
  let wrapResponseConverterMap = ()
  let convertWrapResponse = v => v->RescriptRelay.convertObj(
    wrapResponseConverter, 
    wrapResponseConverterMap, 
    Js.null
  )
  type responseRaw
  let responseConverter: 
    Js.Dict.t<Js.Dict.t<Js.Dict.t<string>>> = 
    %raw(
      json`{"__root":{"getAdminProfile":{"f":""}}}`
    )
  
  let responseConverterMap = ()
  let convertResponse = v => v->RescriptRelay.convertObj(
    responseConverter, 
    responseConverterMap, 
    Js.undefined
  )
  type wrapRawResponseRaw = wrapResponseRaw
  let convertWrapRawResponse = convertWrapResponse
  type rawResponseRaw = responseRaw
  let convertRawResponse = convertResponse
  let variablesConverter: 
    Js.Dict.t<Js.Dict.t<Js.Dict.t<string>>> = 
    %raw(
      json`{}`
    )
  
  let variablesConverterMap = ()
  let convertVariables = v => v->RescriptRelay.convertObj(
    variablesConverter, 
    variablesConverterMap, 
    Js.undefined
  )
}

type queryRef

module Utils = {
  @@ocaml.warning("-33")
  open Types
  external chartTimeRange_toString:
  enum_ChartTimeRange => string = "%identity"
  external chartTimeRange_input_toString:
  enum_ChartTimeRange_input => string = "%identity"
  let makeVariables = (
    ~range
  ): variables => {
    range: range
  }
}
type relayOperationNode
type operationType = RescriptRelay.queryNode<relayOperationNode>


let node: operationType = %raw(json` (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "range"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "range",
    "variableName": "range"
  }
],
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "ds",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DashboardQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AdminProfile",
        "kind": "LinkedField",
        "name": "getAdminProfile",
        "plural": false,
        "selections": [
          {
            "args": (v1/*: any*/),
            "kind": "FragmentSpread",
            "name": "AnswersOverTime"
          },
          {
            "args": (v1/*: any*/),
            "kind": "FragmentSpread",
            "name": "SessionsOverTime"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DashboardQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AdminProfile",
        "kind": "LinkedField",
        "name": "getAdminProfile",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "DatePoint",
            "kind": "LinkedField",
            "name": "answersOverTime",
            "plural": true,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "DatePoint",
            "kind": "LinkedField",
            "name": "sessionsOverTime",
            "plural": true,
            "selections": (v2/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "af6da357346b2697ead3b4f1e5669806",
    "id": null,
    "metadata": {},
    "name": "DashboardQuery",
    "operationKind": "query",
    "text": "query DashboardQuery(\n  $range: ChartTimeRange!\n) {\n  getAdminProfile {\n    ...AnswersOverTime_1W2ebt\n    ...SessionsOverTime_1W2ebt\n  }\n}\n\nfragment AnswersOverTime_1W2ebt on AdminProfile {\n  answersOverTime(range: $range) {\n    ds\n    value\n  }\n}\n\nfragment SessionsOverTime_1W2ebt on AdminProfile {\n  sessionsOverTime(range: $range) {\n    ds\n    value\n  }\n}\n"
  }
};
})() `)

include RescriptRelay.MakeLoadQuery({
    type variables = Types.variables
    type loadedQueryRef = queryRef
    type response = Types.response
    type node = relayOperationNode
    let query = node
    let convertVariables = Internal.convertVariables
  });
