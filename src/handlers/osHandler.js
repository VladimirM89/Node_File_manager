import os from "os";
import {
  INVALID_INPUT_TEXT,
  LINE_START_SYMBOL,
  OPERATION_FAILED_TEXT,
} from "../constants/stringConstants.js";
import { OS_COMMANDS } from "../constants/cliCommands.js";

function osHandler(value) {
  try {
    const additionalCommand = value.split(" ")[1].toLowerCase();

    switch (additionalCommand) {
      case OS_COMMANDS.OEL:
        console.log(`OEL: ${JSON.stringify(os.EOL)}`);
        break;
      case OS_COMMANDS.CPUS:
        getCPUInfo();
        break;
      case OS_COMMANDS.HOMEDIR:
        console.log(`Home directory: ${process.cwd()}`);
        break;
      case OS_COMMANDS.USERNAME:
        console.log(`Hostname: ${os.hostname()}`);
        break;
      case OS_COMMANDS.ARCH:
        console.log(`Architecture: ${os.arch()}`);
        break;
      default:
        process.stdout.write(`${INVALID_INPUT_TEXT}\n`);
    }
  } catch {
    process.stdout.write(`${OPERATION_FAILED_TEXT}\n${LINE_START_SYMBOL}`);
  }
}

export default osHandler;

function getCPUInfo() {
  const data = os.cpus();

  const array = data.map((cpu) => ({
    Model: cpu.model,
    "Speed (GHz)": cpu.speed / 1000,
  }));
  console.table(array);
}
