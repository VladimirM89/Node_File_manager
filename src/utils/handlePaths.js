import { join, dirname } from 'path';

export function getPathToFile(currentFilePath, innerFolders = '', dstFileName) {
  const nameDir = dirname(currentFilePath);
  const dstFilePath = join(nameDir, innerFolders, dstFileName);
  return dstFilePath;
};