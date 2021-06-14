// Generated by ReScript, PLEASE EDIT WITH CARE
/* @generated */
'use strict';

var RescriptRelay = require("rescript-relay/src/RescriptRelay.bs.js");

function makeRefetchVariables(fingerprint, justFails, param) {
  return {
          fingerprint: fingerprint,
          justFails: justFails
        };
}

var Types = {
  makeRefetchVariables: makeRefetchVariables
};

var wrapResponseConverter = {"__root":{"getProfile_fails":{"f":""}}};

function convertWrapResponse(v) {
  return RescriptRelay.convertObj(v, wrapResponseConverter, undefined, null);
}

var responseConverter = {"__root":{"getProfile_fails":{"f":""}}};

function convertResponse(v) {
  return RescriptRelay.convertObj(v, responseConverter, undefined, undefined);
}

var variablesConverter = {};

function convertVariables(v) {
  return RescriptRelay.convertObj(v, variablesConverter, undefined, undefined);
}

var Internal = {
  wrapResponseConverter: wrapResponseConverter,
  wrapResponseConverterMap: undefined,
  convertWrapResponse: convertWrapResponse,
  responseConverter: responseConverter,
  responseConverterMap: undefined,
  convertResponse: convertResponse,
  convertWrapRawResponse: convertWrapResponse,
  convertRawResponse: convertResponse,
  variablesConverter: variablesConverter,
  variablesConverterMap: undefined,
  convertVariables: convertVariables
};

function makeVariables(fingerprint, justFails) {
  return {
          fingerprint: fingerprint,
          justFails: justFails
        };
}

var Utils = {
  makeVariables: makeVariables
};

var node = ((function(){
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
                "name": "Index_filter"
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
    "cacheID": "780c74c250069e5d89190cb6ee1dd9a1",
    "id": null,
    "metadata": {},
    "name": "IndexQuery",
    "operationKind": "query",
    "text": "query IndexQuery(\n  $fingerprint: String!\n  $justFails: Boolean!\n) {\n  getProfile(fingerprint: $fingerprint) {\n    nextQuiz(justFails: $justFails) {\n      id\n      question\n      alternatives\n      answer\n    }\n    fails {\n      ...Index_filter\n    }\n    id\n  }\n}\n\nfragment Index_filter on FailsConnection {\n  totalCount\n}\n"
  }
};
})());

var include = RescriptRelay.MakeLoadQuery({
      query: node,
      convertVariables: convertVariables
    });

var load = include.load;

var queryRefToObservable = include.queryRefToObservable;

var queryRefToPromise = include.queryRefToPromise;

exports.Types = Types;
exports.Internal = Internal;
exports.Utils = Utils;
exports.node = node;
exports.load = load;
exports.queryRefToObservable = queryRefToObservable;
exports.queryRefToPromise = queryRefToPromise;
/* node Not a pure module */