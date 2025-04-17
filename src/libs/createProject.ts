import degit from 'degit';
import { CreateProjectParams } from '@/types';
import { checkExistPathAndRemove, getTargetDir, initProjPackageJson } from '@/utils';
import { execSyncByList } from '@/utils/execSyncByList';

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

  // 初始化 package.json
  initProjPackageJson(targetDir);

  const runExecCommandList = execList.filter((i) => i.isExec).map((i) => i.command);
  execSyncByList(runExecCommandList, { cwd: targetDir });
}
