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
    console.info(`📁 ${name} exist`);
  }
  if (isRemove && isExists) {
    fs.rmSync(filePath, { recursive: true, force: true });
    console.info(`🗑️  ${name} removed`);
  }
}
