open IndexResTypes

module P = {
  @react.component
  let make = (~fingerprint: string) => {
    <UI.App initialQM={ExerciseQueryManager.make(fingerprint)} />
  }
}

let default = (props: props) => {
  <P fingerprint={props.fingerprint} />
}
