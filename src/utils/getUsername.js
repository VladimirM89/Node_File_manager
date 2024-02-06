import {
  ARGS_PREFIX,
  USERNAME_TEMPLATE,
  SEPARATOR,
  INCORRECT_NAME_FORMAT_MSG,
  UNKNOWN_USER_TEXT,
} from "../constants/stringConstants.js";

function getUsername(inputArgs) {
  if (inputArgs.length) {
    const findUsernameResult = inputArgs.find(
      (value) => value.startsWith(ARGS_PREFIX) && value.includes(USERNAME_TEMPLATE),
    );

    if (
      findUsernameResult &&
      findUsernameResult.startsWith(ARGS_PREFIX) &&
      findUsernameResult.includes(USERNAME_TEMPLATE)
    ) {
      const arrayWithUserName = findUsernameResult.split(SEPARATOR);
      const userName = arrayWithUserName[arrayWithUserName.length - 1];
      return userName;
    }
    process.stdout.write(INCORRECT_NAME_FORMAT_MSG);
    process.exit();
  } else {
    return UNKNOWN_USER_TEXT;
  }
}

export default getUsername;
