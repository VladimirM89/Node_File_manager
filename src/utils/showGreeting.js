import { GREETING_MSG } from "../constants/stringConstants.js";

function printGreeting(username) {
  process.stdout.write(`${GREETING_MSG}, ${username}!\n`);
}

export default printGreeting;
