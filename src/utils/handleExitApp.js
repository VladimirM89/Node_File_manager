import { GOODBYE_MSG } from "../constants/stringConstants.js";

function handleExitApp(username) {
  console.log(`\n${GOODBYE_MSG}, ${username}, goodbye!`);
  process.exit();
}

export default handleExitApp;
