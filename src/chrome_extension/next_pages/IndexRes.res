open IndexResTypes

module P = {
  @react.component
  let make = (~fingerprint: string) => {
    let isServer = %raw(`
            function isServer() {
              return typeof window === 'undefined';
            }
          `)
    isServer() ? React.null : <Index.App fingerprint />
  }
}

let default = (props: props) => {
  <RescriptRelay.Context.Provider environment=RelayEnv.environment>
    <P fingerprint={props.fingerprint} />
  </RescriptRelay.Context.Provider>
}
