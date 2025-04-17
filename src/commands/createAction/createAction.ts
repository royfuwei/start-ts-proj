import { createProject } from '@/libs';
import { ActionArgsType, ActionCommandType, CreateProjectParams } from '@/types';
import { runActionPromptArgTemplateFlag } from './runActionPromptArgTemplateFlag';
import { runActionPromptName } from './runActionPromptName';
import { getArgsRmList } from './getArgsRmList';
import { getExecList } from './getExecList';
import { runActionPromptCheckArgs } from './runActionPromptCheckArgs';
import { runActionPromptWhileInputsAddRmList } from './runActionPromptWhileInputsAddRmList';
import { runActionPromptArgRmFlag } from './runActionPromptArgRmFlag';

export async function createAction(name?: string, actionArgs?: ActionArgsType) {
  try {
    console.log('🚀 開始建立專案...');
    const actionArgsParams = actionArgs ?? {};
    const skipPrompt = actionArgsParams.skipPrompt as boolean;

    const projectName = await runActionPromptName(name);

    const template = await runActionPromptArgTemplateFlag(
      actionArgsParams.template as string,
    );

    if (!skipPrompt) await runActionPromptCheckArgs(actionArgsParams);

    // 取得要移除的檔案或資料夾
    const paramArgsRmList = getArgsRmList(actionArgsParams);

    const promptRmFlagRmList = skipPrompt
      ? []
      : await runActionPromptArgRmFlag(actionArgsParams);
    const promptInputsRmList = skipPrompt
      ? []
      : await runActionPromptWhileInputsAddRmList(
          '請輸入要移除的檔案/資料夾 (press double enter to skip):',
        );
    const finalRemoveList = paramArgsRmList
      .concat(promptRmFlagRmList)
      .concat(promptInputsRmList);

    // execList
    const paramArgsExecList = getExecList(actionArgsParams);
    const finalExecList = paramArgsExecList;

    const params: CreateProjectParams = {
      name: projectName,
      template,
      removeList: finalRemoveList,
      execList: finalExecList,
    };

    await createProject(params);
  } catch (error: unknown) {
    if ((error as { name?: string })?.name === 'ExitPromptError') {
      console.log('👋 使用者中斷了輸入（Ctrl+C）');
      process.exit(0);
    } else {
      const errorMessage = (error as { message?: string })?.message;
      if (errorMessage) {
        console.error('❌ 發生錯誤:', errorMessage);
      } else {
        console.error('❌ 發生錯誤:', error);
      }
      process.exit(1);
    }
  }
}

export const createActionCommand: ActionCommandType = {
  name: 'create',
  description: '從 GitHub 模板建立新專案 (Default)',
  flagsOptions: [
    {
      flags: '-t, --template <repo>',
      description: 'GitHub 模板，如 user/repo',
    },
    {
      flags: '--skip-prompt',
      description: 'skip prompt',
      defaultValue: false,
    },
    {
      flags: '--rm <files...>',
      description: 'initial remove files',
      defaultValue: [],
    },
    {
      flags: '--no-husky',
      description: 'remove .husky',
    },
    {
      flags: '--github',
      description: 'keep .github/workflows',
      defaultValue: false,
    },
    {
      flags: '--git-init',
      description: 'run git init',
      defaultValue: false,
    },
    {
      flags: '--npm-install',
      description: 'run npm install',
      defaultValue: false,
    },
  ],
  commandOptions: {
    isDefault: true,
  },
  action: createAction,
};
