import { CURRENT_DIR_TEXT } from "../constants/stringConstants.js";

function printCurrentDirectory() {
  const currentDirectory = process.cwd();
  console.log(`${CURRENT_DIR_TEXT} ${currentDirectory}`);
}

export default printCurrentDirectory;
