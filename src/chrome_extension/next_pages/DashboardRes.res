module P = {
  @react.component
  let make = () => {
    <Dashboard />
  }
}

let default = () => {
  <RescriptRelay.Context.Provider environment=RelayEnv.environment>
    <P />
  </RescriptRelay.Context.Provider>
}
