import { CreateProjectParams } from '@/types';
import {
  checkExistPathAndRemove,
  getTargetDir,
  initProjPackageJson,
  initProjReadMeMd,
  parseTemplateSource,
  templateToLocal,
} from '@/utils';
import { execSyncByList } from '@/utils/execSyncByList';

export async function createProject(params: CreateProjectParams) {
  const { name, template, removeList, execList } = params;

  const targetDir = getTargetDir(name);

  const parsedTemplate = parseTemplateSource(template);
  templateToLocal(parsedTemplate, targetDir);

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

  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log('🎉 開始你的專案吧！');
}
