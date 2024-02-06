import { createHash } from "crypto";
import { createReadStream } from "fs";
import { pipeline } from "stream/promises";
import { normalize, resolve } from "path";
import { LINE_START_SYMBOL, OPERATION_FAILED_TEXT } from "../constants/stringConstants.js";

async function hashHandler(value) {
  try {
    const command = value.split(" ")[1];
    const pathToFileResolved = resolve(normalize(command));

    const data = createReadStream(pathToFileResolved);
    const hash = createHash("sha256");

    process.stdout.write("\n");
    await pipeline(data, hash.setEncoding("hex"), process.stdout, { end: false });
    console.log("\n");
  } catch {
    process.stdout.write(`${OPERATION_FAILED_TEXT}\n${LINE_START_SYMBOL}`);
  }
}

export default hashHandler;
