import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import degit from 'degit';
import { PackageJsonType } from '@/types';

export type CreateProjectOptions = {
  name: string;
  template: string;
};

export async function createProject({ name, template }: CreateProjectOptions) {
  const targetDir = path.resolve(process.cwd(), name);

  if (fs.existsSync(targetDir)) {
    console.error(`❌ 專案資料夾 ${name} 已存在`);
    process.exit(1);
  }

  console.log(`📥 從 GitHub 下載模板 ${template}...`);

  const emitter = degit(template, { cache: false, force: true });

  await emitter.clone(targetDir);

  // 移除 .git
  fs.rmSync(path.join(targetDir, '.git'), { recursive: true, force: true });

  // 移除 .husky
  const huskyDir = path.join(targetDir, '.husky');
  if (fs.existsSync(huskyDir)) {
    fs.rmSync(huskyDir, { recursive: true, force: true });
  }

  console.log(`✅ 專案 ${name} 已建立於 ${targetDir}`);

  // 初始化 git（可選）
  execSync('git init', { cwd: targetDir, stdio: 'inherit' });

  // 初始化 package.json（可選）
  const packageJsonPath = path.join(targetDir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(
      fs.readFileSync(packageJsonPath, 'utf-8'),
    ) as PackageJsonType;
    packageJson.name = name;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  // 安裝依賴（可選）
  // execSync('npm install', { cwd: targetDir, stdio: 'inherit' });
}
