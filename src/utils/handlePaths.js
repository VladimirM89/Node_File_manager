import { join, dirname, normalize } from "path";

export function getPathToFile(currentFilePath, dstFileName, innerFolders = "") {
  const nameDir = dirname(currentFilePath);
  const dstFilePath = join(nameDir, innerFolders, dstFileName);
  return dstFilePath;
}

export function handleInputByUser(value) {
  const arrayValue = value.split(" ");
  const trimArray = arrayValue.filter((item) => item.length);
  return trimArray.join(" ");
}
