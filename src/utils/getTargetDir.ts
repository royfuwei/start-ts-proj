import path from 'path';
import fs from 'fs';

export function getTargetDir(name: string) {
  const targetDir = path.resolve(process.cwd(), name);
  if (fs.existsSync(targetDir)) {
    console.error(`❌ Project folder "${targetDir}" already exists`);
    process.exit(1);
  }
  return targetDir;
}
