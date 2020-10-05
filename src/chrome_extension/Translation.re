let throw: Js.Promise.t(PronounExercises.pronoun_exercise) => unit = [%raw
  "function throwJSExn(a) { throw a; }"
];

module ServerBoundary = {
  type connection =
    | Loading(Js.Promise.t(PronounExercises.pronoun_exercise))
    | Success(PronounExercises.pronoun_exercise)
    | Fail;
  type tok = string;
  let cache: Hashtbl.t(string, connection) = Hashtbl.create(100);

  let getExercise = () => {
    Fetch.fetch("http://127.0.0.1:3000/pronoun_exercises")
    |> Js.Promise.then_(Fetch.Response.json)
    |> Js.Promise.then_(txt =>
         PronounExercises.decode(txt) |> Js.Promise.resolve
       );
  };

  let create = (): tok => {
    let id = Hashtbl.length(cache);
    let tok = {j|conn-$id|j};
    Hashtbl.add(
      cache,
      tok,
      Loading(
        getExercise()
        |> Js.Promise.then_(e => {
             Hashtbl.add(cache, tok, Success(e));
             Js.Promise.resolve(e);
           }),
      ),
    );
    tok;
  };

  let resolve = (tok): PronounExercises.pronoun_exercise =>
    switch (Hashtbl.find(cache, tok)) {
    | Loading(p) =>
      throw(p);
      raise(Not_found);
    | Success(e) => e
    | Fail => raise(Not_found)
    };

  let curTok = ref(create());

  let reset = () => {
    curTok := create();
    curTok^;
  };

  let curExercise = () => resolve(curTok^);
};

type tok = ServerBoundary.tok;

let getExercise = ServerBoundary.curExercise;
let current = () => {
  ServerBoundary.curTok^;
};
let next = () => {
  ServerBoundary.reset()->ignore;
};
