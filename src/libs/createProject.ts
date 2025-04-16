import { execSync } from 'child_process';
import degit from 'degit';
import { CreateProjectParams } from '@/types';
import { checkExistPathAndRemove, getTargetDir, initProjPackageJson } from '@/utils';

export async function createProject({ name, template }: CreateProjectParams) {
  const targetDir = getTargetDir(name);

  console.log(`📥 從 GitHub 下載模板 ${template}...`);

  const emitter = degit(template, { cache: false, force: true });

  await emitter.clone(targetDir);

  // 移除 .git
  checkExistPathAndRemove(targetDir, '.git', true);

  // 移除 .husky
  checkExistPathAndRemove(targetDir, '.husky', true);

  // 移除 .github
  checkExistPathAndRemove(targetDir, '.github', true);

  console.log(`✅ 專案 ${name} 已建立於 ${targetDir}`);

  // 初始化 git（可選）
  execSync('git init', { cwd: targetDir, stdio: 'inherit' });

  // 初始化 package.json（可選）
  initProjPackageJson(targetDir);

  // 安裝依賴（可選）
  // execSync('npm install', { cwd: targetDir, stdio: 'inherit' });
}
