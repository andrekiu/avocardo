import Server from "../../server/Server.bs.js";

export default function handler(req, res) {
  return Server.handlePronounExercises(req, res);
}
