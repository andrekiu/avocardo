type t('b) = {read: unit => 'b};
type status('b) =
  | Loading
  | Failed
  | Succeed('b);

let make: Js.Promise.t('a) => t('a) =
  (p: Js.Promise.t('a)) => (
    {
      let status: ref(status('a)) = ref(Loading);
      p
      |> Js.Promise.then_(e => {
           status := Succeed(e);
           Js.Promise.resolve(e);
         })
      |> ignore;

      {
        read: () => {
          switch (status^) {
          | Loading =>
            [%raw
              {|
            function fn() {
              throw p;
            }
          |}
            ]()
          | Failed => raise(Not_found)
          | Succeed(e) => e
          };
        },
      };
    }:
      t('a)
  );
