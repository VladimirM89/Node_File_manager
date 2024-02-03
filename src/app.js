import * as readline from "node:readline/promises";
import {
  EXIT_WORD,
  LINE_START_SYMBOL,
  OPERATION_FAILED_TEXT,
} from "./constants/stringConstants.js";
import getUsername from "./utils/getUsername.js";
import printGreeting from "./utils/showGreeting.js";
import handleExitApp from "./utils/handleExitApp.js";
import printCurrentDirectory from "./utils/printCurrentDirectory.js";

async function app() {
  try {
    const userName = getUsername(process.argv.slice(2));

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: LINE_START_SYMBOL,
    });

    printGreeting(userName);
    printCurrentDirectory();
    rl.prompt();

    rl.on("line", (msg) => {
      if (msg.toString().trim() === EXIT_WORD) {
        process.exit();
      }
      printCurrentDirectory();
      rl.prompt();
    });

    rl.on("SIGINT", () => {
      process.exit();
    });

    process.on("exit", () => handleExitApp(userName));
  } catch (error) {
    process.stdout.write(`${OPERATION_FAILED_TEXT}\n${LINE_START_SYMBOL}`);
  }
}

app();
