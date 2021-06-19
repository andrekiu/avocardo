/* @generated */
%%raw("/* @generated */")
module Types = {
  @@ocaml.warning("-30")
  
  type rec response_getProfile = {
    nextQuiz: option<response_getProfile_nextQuiz>,
    fails: response_getProfile_fails,
  }
   and response_getProfile_nextQuiz = {
    id: string,
    question: string,
    alternatives: array<string>,
    answer: string,
  }
   and response_getProfile_fails = {
    fragmentRefs: RescriptRelay.fragmentRefs<[ | #Filter]>
  }
  
  
  type response = {
    getProfile: response_getProfile,
  }
  type rawResponse = response
  type refetchVariables = {
    fingerprint: option<string>,
    justFails: option<bool>,
  }
  let makeRefetchVariables = (
    ~fingerprint=?,
    ~justFails=?,
    ()
  ): refetchVariables => {
    fingerprint: fingerprint,
    justFails: justFails
  }
  
  type variables = {
    fingerprint: string,
    justFails: bool,
  }
}

module Internal = {
  type wrapResponseRaw
  let wrapResponseConverter: 
    Js.Dict.t<Js.Dict.t<Js.Dict.t<string>>> = 
    %raw(
      json`{"__root":{"getProfile_nextQuiz":{"n":""},"getProfile_fails":{"f":""}}}`
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
      json`{"__root":{"getProfile_nextQuiz":{"n":""},"getProfile_fails":{"f":""}}}`
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
  let makeVariables = (
    ~fingerprint,
    ~justFails
  ): variables => {
    fingerprint: fingerprint,
    justFails: justFails
  }
}
type relayOperationNode
type operationType = RescriptRelay.queryNode<relayOperationNode>


let node: operationType = %raw(json` (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "fingerprint"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "justFails"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "fingerprint",
    "variableName": "fingerprint"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "justFails",
      "variableName": "justFails"
    }
  ],
  "concreteType": "Quiz",
  "kind": "LinkedField",
  "name": "nextQuiz",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "question",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "alternatives",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "answer",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IndexQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Profile",
        "kind": "LinkedField",
        "name": "getProfile",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "FailsConnection",
            "kind": "LinkedField",
            "name": "fails",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Filter"
              }
            ],
            "storageKey": null
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
    "name": "IndexQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Profile",
        "kind": "LinkedField",
        "name": "getProfile",
        "plural": false,
        "selections": [
          (v3/*: any*/),
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
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a310a602f9978b540145206f050ab9c3",
    "id": null,
    "metadata": {},
    "name": "IndexQuery",
    "operationKind": "query",
    "text": "query IndexQuery(\n  $fingerprint: String!\n  $justFails: Boolean!\n) {\n  getProfile(fingerprint: $fingerprint) {\n    nextQuiz(justFails: $justFails) {\n      id\n      question\n      alternatives\n      answer\n    }\n    fails {\n      ...Filter\n    }\n    id\n  }\n}\n\nfragment Filter on FailsConnection {\n  totalCount\n}\n"
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
