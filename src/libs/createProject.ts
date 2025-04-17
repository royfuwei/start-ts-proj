import { CreateProjectParams } from '@/types';
import {
  checkExistPathAndRemove,
  degitTemplateToLocal,
  getTargetDir,
  initProjPackageJson,
  initProjReadMeMd,
} from '@/utils';
import { execSyncByList } from '@/utils/execSyncByList';

export async function createProject(params: CreateProjectParams) {
  const { name, template, removeList, execList } = params;

  const targetDir = getTargetDir(name);

  await degitTemplateToLocal(targetDir, template);

  for (const item of removeList) {
    checkExistPathAndRemove(targetDir, item.field, item.isRemove);
  }

  // 初始化 package.json
  initProjPackageJson(targetDir);

  // 初始化 README.md
  initProjReadMeMd(template, targetDir);

  const runExecCommandList = execList.filter((i) => i.isExec).map((i) => i.command);
  execSyncByList(runExecCommandList, { cwd: targetDir });

  console.log(`✅ 專案 ${name} 已建立於 ${targetDir}`);
}
