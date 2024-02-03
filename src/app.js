import { Worker } from 'node:worker_threads';
import { ACTION_SHUTDOWN, EXIT_WORD, GOODBYE_MSG, LINE_START_SYMBOL } from './constants/stringConstants.js';
import * as readline from 'node:readline/promises';
import { getPathToFile } from './utils/handlePaths.js';
import { fileURLToPath } from 'url';

function app() {
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

};

function handleExitApp(username) {
  console.log(`${GOODBYE_MSG}, ${username}, goodbye!`);
  process.exit();
}

app();



