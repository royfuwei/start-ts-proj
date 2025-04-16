import { createProject } from '@/libs';
import { ActionArgsType, ActionCommandType } from '@/types';
import { runActionArgTemplate } from './runActionArgTemplate';
import { runActionArgName } from './runActionArgName';

export async function createAction(name?: string, actionArgs?: ActionArgsType) {
  try {
    const projectName = await runActionArgName(name);
    const template = await runActionArgTemplate(actionArgs?.template as string);

    await createProject({ name: projectName, template });
  } catch (error: unknown) {
    if ((error as { name?: string })?.name === 'ExitPromptError') {
      console.log('👋 使用者中斷了輸入（Ctrl+C）');
      process.exit(0);
    } else {
      console.error('❌ 發生錯誤:', error);
      throw error;
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
  ],
  commandOptions: {
    isDefault: true,
  },
  action: createAction,
};
