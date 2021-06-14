/* @generated */
%%raw("/* @generated */")
module Types = {
  @@ocaml.warning("-30")
  
  type rec response_addAnswer = {
    id: string,
    fails: response_addAnswer_fails,
  }
   and response_addAnswer_fails = {
    totalCount: int,
  }
  
  
  type response = {
    addAnswer: response_addAnswer,
  }
  type rawResponse = response
  type variables = {
    fingerprint: string,
    quiz_id: string,
    didSucceed: bool,
  }
}

module Internal = {
  type wrapResponseRaw
  let wrapResponseConverter: 
    Js.Dict.t<Js.Dict.t<Js.Dict.t<string>>> = 
    %raw(
      json`{}`
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
      json`{}`
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


module Utils = {
  @@ocaml.warning("-33")
  open Types
  let makeVariables = (
    ~fingerprint,
    ~quiz_id,
    ~didSucceed
  ): variables => {
    fingerprint: fingerprint,
    quiz_id: quiz_id,
    didSucceed: didSucceed
  }
  let make_response_addAnswer_fails = (
    ~totalCount
  ): response_addAnswer_fails => {
    totalCount: totalCount
  }
  let make_response_addAnswer = (
    ~id,
    ~fails
  ): response_addAnswer => {
    id: id,
    fails: fails
  }
  let makeOptimisticResponse = (
    ~addAnswer
  ): rawResponse => {
    addAnswer: addAnswer
  }
}
type relayOperationNode
type operationType = RescriptRelay.mutationNode<relayOperationNode>


let node: operationType = %raw(json` (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "didSucceed"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "fingerprint"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "quiz_id"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "didSucceed",
        "variableName": "didSucceed"
      },
      {
        "kind": "Variable",
        "name": "fingerprint",
        "variableName": "fingerprint"
      },
      {
        "kind": "Variable",
        "name": "quiz_id",
        "variableName": "quiz_id"
      }
    ],
    "concreteType": "Profile",
    "kind": "LinkedField",
    "name": "addAnswer",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "FailsConnection",
        "kind": "LinkedField",
        "name": "fails",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalCount",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "IndexAddAnswerMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "IndexAddAnswerMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "515b81f7d988819755c77b0007f093d9",
    "id": null,
    "metadata": {},
    "name": "IndexAddAnswerMutation",
    "operationKind": "mutation",
    "text": "mutation IndexAddAnswerMutation(\n  $fingerprint: ID!\n  $quiz_id: ID!\n  $didSucceed: Boolean!\n) {\n  addAnswer(fingerprint: $fingerprint, quiz_id: $quiz_id, didSucceed: $didSucceed) {\n    id\n    fails {\n      totalCount\n    }\n  }\n}\n"
  }
};
})() `)


