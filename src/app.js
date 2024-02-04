import * as readline from "node:readline/promises";
import os from "os";
import {
  EXIT_WORD,
  INVALID_INPUT_TEXT,
  LINE_START_SYMBOL,
  OPERATION_FAILED_TEXT,
} from "./constants/stringConstants.js";
import getUsername from "./utils/getUsername.js";
import printGreeting from "./utils/showGreeting.js";
import handleExitApp from "./utils/handleExitApp.js";
import printCurrentDirectory from "./utils/printCurrentDirectory.js";
import changeDir from "./utils/changeDir.js";
import {
  ALL_CLI_COMMANDS,
  COMPRESS_COMMANDS,
  DIRECTORY_COMMANDS,
  FILE_COMMANDS,
  HASH_COMMANDS,
  OS_COMMANDS,
} from "./constants/cliCommands.js";
import directoryHandler from "./handlers/directoryHandler.js";
import osHandler from "./handlers/osHandler.js";
import hashHandler from "./handlers/hashHandler.js";
import compressHandler from "./handlers/compressHandler.js";
import filesystemHandler from "./handlers/filesystemHandler.js";

async function app() {
  try {
    const userName = getUsername(process.argv.slice(2));

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: LINE_START_SYMBOL,
    });

    changeDir(os.homedir());

    printGreeting(userName);
    printCurrentDirectory();
    rl.prompt();

    rl.on("line", async (msg) => {
      const command = msg.split(" ")[0];
      const lowercaseCommand = command.toLocaleLowerCase();
      if (Object.values(DIRECTORY_COMMANDS).includes(lowercaseCommand)) await directoryHandler(msg);
      if (Object.values(FILE_COMMANDS).includes(lowercaseCommand)) filesystemHandler(msg);
      if (msg.includes(OS_COMMANDS.OS)) osHandler(msg);
      if (msg.includes(HASH_COMMANDS.HASH)) hashHandler(msg);
      if (Object.values(COMPRESS_COMMANDS).includes(lowercaseCommand)) compressHandler(msg);
      if (!Object.values(ALL_CLI_COMMANDS).includes(lowercaseCommand) && !msg.includes(EXIT_WORD))
        process.stdout.write(`${INVALID_INPUT_TEXT}\n`);

      if (msg.trim() === EXIT_WORD) {
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
