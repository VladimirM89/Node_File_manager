import { writeFile, rename, unlink } from "fs/promises";
import { createReadStream, createWriteStream } from "fs";
import { dirname, join, normalize, parse } from "path";
import { pipeline } from "stream/promises";
import { FILE_COMMANDS } from "../constants/cliCommands.js";
import {
  INVALID_INPUT_TEXT,
  OPERATION_FAILED_TEXT,
  LINE_START_SYMBOL,
  FILE_EXIST_TEXT,
  SPECIAL_SYMBOLS_REGEXP,
  NOT_CONTAIN_SPEC_CHARS_TEXT,
} from "../constants/stringConstants.js";

async function filesystemHandler(value) {
  try {
    const command = value.split(" ")[0].toLowerCase();
    const path = value.split(" ")[1];
    const valueWithoutCommand = value.split(" ").slice(1);

    switch (command) {
      case FILE_COMMANDS.CAT:
        await handleReadFile(path);
        break;
      case FILE_COMMANDS.ADD:
        await addEmptyFile(path);
        break;
      case FILE_COMMANDS.RN:
        await renameFile(valueWithoutCommand);
        break;
      case FILE_COMMANDS.CP:
        await copyFile(valueWithoutCommand);
        break;
      case FILE_COMMANDS.MV:
        await moveFile(valueWithoutCommand);
        break;
      case FILE_COMMANDS.RM:
        await deleteFile(valueWithoutCommand);
        break;
      default:
        process.stdout.write(`${INVALID_INPUT_TEXT}\n`);
    }
  } catch {
    process.stdout.write(`${OPERATION_FAILED_TEXT}\n${LINE_START_SYMBOL}`);
  }
}

export default filesystemHandler;

async function handleReadFile(pathToFile) {
  const normalizePath = normalize(pathToFile);

  // try {
  const data = createReadStream(normalizePath);
  data.on("open", () => process.stdout.write("\n"));
  data.on("end", () => process.stdout.write("\n\n"));

  await pipeline(data, process.stdout, { end: false });
  // } catch {
  //   process.stdout.write(`${OPERATION_FAILED_TEXT}\n${LINE_START_SYMBOL}`);
  // }
}

async function addEmptyFile(fileName) {
  const pathToNewFile = join(process.cwd(), fileName);

  // try {
  try {
    await writeFile(pathToNewFile, "", { flag: "wx" });
  } catch {
    process.stdout.write(`${FILE_EXIST_TEXT}\n`);
    throw new Error();
  }
  // } catch {
  //   process.stdout.write(`${OPERATION_FAILED_TEXT}\n${LINE_START_SYMBOL}`);
  // }
}

async function renameFile(value) {
  try {
    const pathToFile = normalize(value[0]);
    const fileExtension = parse(pathToFile).ext;
    const dirnameFile = dirname(pathToFile);

    const newFileName = value[1];

    if (SPECIAL_SYMBOLS_REGEXP.test(newFileName)) {
      process.stdout.write(`${NOT_CONTAIN_SPEC_CHARS_TEXT}\n`);
      throw new Error();
    }

    const newFilePath = join(dirnameFile, newFileName);

    await rename(pathToFile, `${newFilePath}${fileExtension}`);
  } catch {
    process.stdout.write(`${OPERATION_FAILED_TEXT}\n${LINE_START_SYMBOL}`);
  }
}

async function copyFile([pathToCurrentFile, pathToNewDir]) {
  // try {
  const pathToCurrentFileNormalize = normalize(pathToCurrentFile);
  const pathToNewDirNormalize = normalize(pathToNewDir);

  const currentFileName = parse(pathToCurrentFileNormalize).base;
  const newFilePath = join(pathToNewDirNormalize, currentFileName);

  const readStream = createReadStream(pathToCurrentFileNormalize);
  const writeStream = createWriteStream(newFilePath, { flags: "wx" });

  await pipeline(readStream, writeStream);
  // } catch {
  //   process.stdout.write(`${OPERATION_FAILED_TEXT}\n${LINE_START_SYMBOL}`);
  // }
}

async function deleteFile([pathToCurrentFile]) {
  await unlink(normalize(pathToCurrentFile));
}

async function moveFile([pathToCurrentFile, pathToNewDir]) {
  await copyFile([pathToCurrentFile, pathToNewDir]);
  // try {
  await deleteFile(pathToCurrentFile);
  // } catch {
  //   process.stdout.write(`${OPERATION_FAILED_TEXT}\n${LINE_START_SYMBOL}`);
  // }
}
