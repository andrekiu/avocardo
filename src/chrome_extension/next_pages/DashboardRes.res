module P = {
  @react.component
  let make = () => {
    let isServer = %raw(`
            function isServer() {
              return typeof window === 'undefined';
            }
          `)
    isServer() ? React.null : <Dashboard />
  }
}

let default = () => {
  <RescriptRelay.Context.Provider environment=RelayEnv.environment>
    <P />
  </RescriptRelay.Context.Provider>
}
