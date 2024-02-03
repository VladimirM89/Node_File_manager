import { Worker } from 'node:worker_threads';
import { ACTION_SHUTDOWN, EXIT_WORD, GOODBYE_MSG, LINE_START_SYMBOL, OPERATION_FAILED_TEXT } from './constants/stringConstants.js';
import * as readline from 'node:readline/promises';
import { getPathToFile } from './utils/handlePaths.js';
import { fileURLToPath } from 'url';
import OperationError from './utils/customError.js';

function app() {
  try {
    const rl = readline.createInterface(
      { input: process.stdin,
        output: process.stdout,
        prompt: LINE_START_SYMBOL,
      });
  
    let userName;
    rl.on('line', (msg) => {
      if (msg.toString().trim() === EXIT_WORD) {
        handleExitApp(userName);
      }
      rl.prompt();
    });
  
    rl.on('SIGINT', () => {
      handleExitApp(userName);
    });
  
    const pathGreetingFile = getPathToFile(fileURLToPath(import.meta.url), 'components/Greeting', 'Greeting.js');
    const greetingWt = new Worker(pathGreetingFile, {argv: process.argv});
  
    greetingWt.on('message', (msg) => {
      rl.write(`${msg.message}`);
  
      userName = msg.username;
  
      if (msg.action === ACTION_SHUTDOWN) {
        process.exit();
      }
    });

    greetingWt.on('error', () => {
      throw new OperationError();
    });

    throw new OperationError();

  } catch(error) {
    console.log(`${error.message}\n${LINE_START_SYMBOL}`);
  }

};

function handleExitApp(username) {
  console.log(`${GOODBYE_MSG}, ${username}, goodbye!`);
  process.exit();
}

app();



