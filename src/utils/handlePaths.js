import { join, dirname } from "path";

export default function getPathToFile(currentFilePath, dstFileName, innerFolders = "") {
  const nameDir = dirname(currentFilePath);
  const dstFilePath = join(nameDir, innerFolders, dstFileName);
  return dstFilePath;
}
