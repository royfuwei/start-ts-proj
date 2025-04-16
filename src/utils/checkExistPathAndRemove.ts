import path from 'path';
import fs from 'fs';

export function checkExistPathAndRemove(
  targetDir: string,
  name: string,
  isRemove: boolean = true,
): void {
  const filePath = path.join(targetDir, name);
  const isExists = fs.existsSync(filePath);
  if (isExists) {
    console.info(`📁 ${filePath} exist`);
  }
  if (isRemove && isExists) {
    fs.rmSync(filePath, { recursive: true, force: true });
    console.info(`🗑️  ${filePath} removed`);
  }
}
