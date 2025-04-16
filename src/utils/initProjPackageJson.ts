import path from 'path';
import fs from 'fs';
import { PackageJsonType } from '@/types';

export function initProjPackageJson(targetDir: string, isInit = true) {
  const packageJsonPath = path.join(targetDir, 'package.json');
  const projectName = path.basename(targetDir);
  const isExists = fs.existsSync(packageJsonPath);
  if (isInit && isExists) {
    console.info(`📁 ${packageJsonPath} exist`);
    const packageJson = JSON.parse(
      fs.readFileSync(packageJsonPath, 'utf-8'),
    ) as PackageJsonType;
    const originalName = packageJson.name;
    packageJson.name = projectName;
    packageJson.description = `A project created by ${originalName}`;
    packageJson.version = '0.0.0';
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }
}
