module P = {
  @react.component
  let make = () => {
    let isServer = %raw(`
            function isServer() {
              return typeof window === 'undefined';
            }
          `)
    isServer() ? React.null : <FeedbackAdmin />
  }
}

let default = () => {
  <React.Suspense fallback={React.string("Loading...")}>
    <RescriptRelay.Context.Provider environment=RelayEnv.environment>
      <P />
    </RescriptRelay.Context.Provider>
  </React.Suspense>
}
