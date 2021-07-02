@module external style: {"prompt": string} = "./Prompt.module.css"
@react.component
let make = () => {
  <span className={style["prompt"]} />
}
