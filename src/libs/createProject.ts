import { execSync } from 'child_process';
import degit from 'degit';
import { CreateProjectParams } from '@/types';
import { checkExistPathAndRemove, getTargetDir, initProjPackageJson } from '@/utils';

export async function createProject(params: CreateProjectParams) {
  const { name, template, removeList, execList } = params;

  const targetDir = getTargetDir(name);

  console.log(`📥 從 GitHub 下載模板 ${template}...`);

  const emitter = degit(template, { cache: false, force: true });

  await emitter.clone(targetDir);

  for (const item of removeList) {
    checkExistPathAndRemove(targetDir, item.field, item.isRemove);
  }

  console.log(`✅ 專案 ${name} 已建立於 ${targetDir}`);

  // 初始化 package.json（可選）
  initProjPackageJson(targetDir);

  for (const item of execList) {
    if (item.isExec) {
      console.log(`🚀 開始執行 ${item.command}...`);
      execSync(item.command, { cwd: targetDir, stdio: 'inherit' });
    }
  }
}
