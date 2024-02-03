import { USERNAME_TEMPLATE, ARGS_PREFIX, SEPARATOR, GREETING_MSG, INCORRECT_NAME_FORMAT_MSG, ACTION_SHUTDOWN, ACTION_PROCEED } from "../../constants/stringConstants.js";
import { parentPort } from 'node:worker_threads';
import OperationError from "../../utils/customError.js";

function printGreeting() {
  const inputArgs = process.argv.slice(2);

  const findUsernameResult = inputArgs.find((value) => value.startsWith(ARGS_PREFIX) && value.includes(USERNAME_TEMPLATE));

  if (
    findUsernameResult
    && findUsernameResult.startsWith(ARGS_PREFIX)
    && findUsernameResult.includes(USERNAME_TEMPLATE)
    ) {
    const arrayWithUserName = findUsernameResult.split(SEPARATOR);
    const userName = arrayWithUserName[arrayWithUserName.length - 1];

    parentPort.postMessage({action: ACTION_PROCEED, message: `${GREETING_MSG}, ${userName}\n`, username: userName});

  } else {
    parentPort.postMessage({action: ACTION_SHUTDOWN, message: INCORRECT_NAME_FORMAT_MSG});
  }

  parentPort.close();
};

printGreeting();;