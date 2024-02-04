/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { sep, parse, resolve, normalize, join } from "path";
import { readdir, stat } from "fs/promises";
import os from "os";
import { ADDITIONAL_COMMANDS, DIRECTORY_COMMANDS } from "../constants/cliCommands.js";
import changeDir from "../utils/changeDir.js";
import {
  EMPTY_FOLDER_MESSAGE,
  FOLDER,
  LINE_START_SYMBOL,
  OPERATION_FAILED_TEXT,
  FILE,
  FOLDER_NOT_EXIST_MESSAGE,
  INVALID_INPUT_TEXT,
} from "../constants/stringConstants.js";
import ERRORS from "../constants/errors.js";

async function directoryHandler(value) {
  try {
    const trimValue = value.trim();
    const command = trimValue.split(" ")[0].toLowerCase();
    const path = trimValue.split(" ")[1];

    switch (command) {
      case DIRECTORY_COMMANDS.UP:
        upToPrevFolder();
        break;
      case DIRECTORY_COMMANDS.CD:
        handleChangeDir(path);
        break;
      case DIRECTORY_COMMANDS.LS:
        await handleList();
        break;
      default:
        process.stdout.write(`${INVALID_INPUT_TEXT}\n`);
    }
  } catch {
    process.stdout.write(`${OPERATION_FAILED_TEXT}\n${LINE_START_SYMBOL}`);
  }
}

export default directoryHandler;

function upToPrevFolder() {
  try {
    const rootPath = parse(process.cwd()).root;

    if (rootPath !== process.cwd()) {
      const newPathArray = process.cwd().split(sep).slice(0, -1);
      if (newPathArray.length > 1) {
        changeDir("..");
      } else {
        changeDir(rootPath);
      }
    }
  } catch (error) {
    process.stdout.write(`${OPERATION_FAILED_TEXT}\n${LINE_START_SYMBOL}`);
  }
}

async function handleChangeDir(path) {
  try {
    if (path === ADDITIONAL_COMMANDS.TILDE) {
      changeDir(os.homedir());
      return;
    }
    changeDir(resolve(normalize(path)));
  } catch {
    process.stdout.write(`${FOLDER_NOT_EXIST_MESSAGE}\n`);
    process.stdout.write(`${OPERATION_FAILED_TEXT}\n${LINE_START_SYMBOL}`);
  }
}

async function handleList() {
  try {
    const list = await readdir(process.cwd());
    if (list.length) {
      console.log("\n");
      const listObject = [];

      for (const item of list) {
        try {
          const pathToFile = join(process.cwd(), item);

          listObject.push({
            Name: item,
            Type: (await stat(pathToFile)).isDirectory() ? FOLDER : FILE,
          });
        } catch (error) {
          if (error.code !== ERRORS.EPERM) {
            process.stdout.write(`${OPERATION_FAILED_TEXT}\n${LINE_START_SYMBOL}`);
          }
        }
      }

      const directoryArray = listObject.filter((item) => item.Type === FOLDER);
      directoryArray.sort((a, b) => a.Name.localeCompare(b.Name));

      const fileArray = listObject.filter((item) => item.Type === FILE);
      fileArray.sort((a, b) => a.Name.localeCompare(b.Name));

      console.table([...directoryArray, ...fileArray]);
    } else {
      process.stdout.write(`${EMPTY_FOLDER_MESSAGE}\n`);
    }
  } catch {
    process.stdout.write(`${OPERATION_FAILED_TEXT}\n${LINE_START_SYMBOL}`);
  }
}
