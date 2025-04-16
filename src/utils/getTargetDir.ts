import path from 'path';
import fs from 'fs';

export function getTargetDir(name: string) {
  const targetDir = path.resolve(process.cwd(), name);
  if (fs.existsSync(targetDir)) {
    console.error(`❌ 專案資料夾 ${name} 已存在`);
    process.exit(1);
  }
  return targetDir;
}
