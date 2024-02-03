import { join, dirname } from "path";

export function getPathToFile(currentFilePath, dstFileName, innerFolders = "") {
  const nameDir = dirname(currentFilePath);
  const dstFilePath = join(nameDir, innerFolders, dstFileName);
  return dstFilePath;
}

export function getCurrentDirectory(currentFilePath) {
  const nameDir = dirname(currentFilePath);
  return nameDir;
}
