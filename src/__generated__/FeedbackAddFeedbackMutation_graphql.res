/* @generated */
%%raw("/* @generated */")
module Types = {
  @@ocaml.warning("-30")
  
  type enum_QuestionFeedback = private [>
    | #APP_BROKEN
    | #FAULTY_OPTIONS
    | #FAULTY_QUIZ
    ]
  
  type enum_QuestionFeedback_input = [
    | #APP_BROKEN
    | #FAULTY_OPTIONS
    | #FAULTY_QUIZ
    ]
  
  type rec response_addFeedback = {
    id: string,
  }
  type response = {
    addFeedback: response_addFeedback,
  }
  type rawResponse = response
  type variables = {
    fingerprint: string,
    quiz_id: string,
    feedback: array<[
    | #APP_BROKEN
    | #FAULTY_OPTIONS
    | #FAULTY_QUIZ
    ]>,
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
  external questionFeedback_toString:
  enum_QuestionFeedback => string = "%identity"
  external questionFeedback_input_toString:
  enum_QuestionFeedback_input => string = "%identity"
  let makeVariables = (
    ~fingerprint,
    ~quiz_id,
    ~feedback
  ): variables => {
    fingerprint: fingerprint,
    quiz_id: quiz_id,
    feedback: feedback
  }
  let make_response_addFeedback = (
    ~id
  ): response_addFeedback => {
    id: id
  }
  let makeOptimisticResponse = (
    ~addFeedback
  ): rawResponse => {
    addFeedback: addFeedback
  }
}
type relayOperationNode
type operationType = RescriptRelay.mutationNode<relayOperationNode>


let node: operationType = %raw(json` (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "feedback"
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
        "name": "feedback",
        "variableName": "feedback"
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
    "name": "addFeedback",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "FeedbackAddFeedbackMutation",
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
    "name": "FeedbackAddFeedbackMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "59cc875b6aa2508d88ebbfd366229815",
    "id": null,
    "metadata": {},
    "name": "FeedbackAddFeedbackMutation",
    "operationKind": "mutation",
    "text": "mutation FeedbackAddFeedbackMutation(\n  $fingerprint: ID!\n  $quiz_id: ID!\n  $feedback: [QuestionFeedback!]!\n) {\n  addFeedback(fingerprint: $fingerprint, quiz_id: $quiz_id, feedback: $feedback) {\n    id\n  }\n}\n"
  }
};
})() `)


