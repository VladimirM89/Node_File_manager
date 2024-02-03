export const DIRECTORY_COMMANDS = {
  UP: "up",
  CD: "cd",
  LS: "ls",
};

export const FILE_COMMANDS = {
  CAT: "cat",
  ADD: "add",
  RN: "rn",
  CP: "cp",
  MV: "mv",
  RM: "rm",
};

export const OS_COMMANDS = {
  OS: "os",
};

export const HASH_COMMANDS = {
  HASH: "hash",
};

export const COMPRESS_COMMANDS = {
  COMPRESS: "compress",
  DECOMPRESS: "decompress",
};

export const ALL_CLI_COMMANDS = {
  ...DIRECTORY_COMMANDS,
  ...FILE_COMMANDS,
  ...OS_COMMANDS,
  ...HASH_COMMANDS,
  ...COMPRESS_COMMANDS,
};
