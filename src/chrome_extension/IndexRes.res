open IndexResTypes

module P = {
  @react.component
  let make = (~fingerprint: string) => {
    let isServer = %raw(`
            function isServer() {
              return typeof window === 'undefined';
            }
          `)
    isServer() ? React.null : <UI.App initialQM={ExerciseQueryManager.make(fingerprint)} />
  }
}

let default = (props: props) => {
  <P fingerprint={props.fingerprint} />
}
