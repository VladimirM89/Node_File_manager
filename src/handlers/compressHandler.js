import { normalize, resolve } from "path";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { pipeline } from "stream/promises";
import { COMPRESS_COMMANDS } from "../constants/cliCommands.js";
import {
  OPERATION_FAILED_TEXT,
  LINE_START_SYMBOL,
  INVALID_INPUT_TEXT,
} from "../constants/stringConstants.js";

async function compressHandler(value) {
  try {
    const [command, pathToFile, pathToDst] = value.split(" ");
    const pathToFileResolved = resolve(normalize(pathToFile));
    const pathToDstResolved = resolve(normalize(pathToDst));

    switch (command) {
      case COMPRESS_COMMANDS.COMPRESS:
        await compressBrotli(pathToFileResolved, pathToDstResolved);
        break;
      case COMPRESS_COMMANDS.DECOMPRESS:
        await decompressBrotli(pathToFileResolved, pathToDstResolved);
        break;
      default:
        process.stdout.write(`${INVALID_INPUT_TEXT}\n`);
    }
  } catch {
    process.stdout.write(`${OPERATION_FAILED_TEXT}\n${LINE_START_SYMBOL}`);
  }
}

export default compressHandler;

async function compressBrotli(sourceFilePath, dstFilePath) {
  const readStream = createReadStream(sourceFilePath);
  const writeStream = createWriteStream(dstFilePath, { flags: "wx+" });

  const compress = createBrotliCompress();

  await pipeline(readStream, compress, writeStream);
}

async function decompressBrotli(sourceFilePath, dstFilePath) {
  const readStream = createReadStream(sourceFilePath);
  const writeStream = createWriteStream(dstFilePath, { flags: "wx+" });

  const compress = createBrotliDecompress();

  await pipeline(readStream, compress, writeStream);
}
