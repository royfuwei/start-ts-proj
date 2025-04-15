import { configs } from '@/configs';
import { createProject } from '@/libs';
import { ActionArgsType, ActionCommandType, OptionsType } from '@/types';
import inquirer from 'inquirer';

export async function createAction(name?: string, actionArgs?: ActionArgsType) {
  const { templates } = configs;
  try {
    if (!name) {
      const res: OptionsType = await inquirer.prompt([
        { type: 'input', name: 'name', message: '請輸入專案名稱', default: 'my-app' },
      ]);
      name = res.name ? String(res.name) : undefined;
    }
    if (!name) {
      console.error('❌ 專案名稱無效');
      process.exit(1);
    }

    let template: string | undefined = actionArgs?.template
      ? String(actionArgs.template)
      : undefined;
    if (!template) {
      const res: OptionsType = await inquirer.prompt([
        {
          type: 'input',
          name: 'template',
          message: '請輸入模板 (如 user/repo)，輸入 Enter 使用預設模板',
        },
      ]);
      template = res.template ? String(res.template) : undefined;
    }
    if (!template) {
      const res: OptionsType = await inquirer.prompt([
        {
          name: 'template',
          message: '請選擇模板',
          type: 'list',
          choices: templates.map((t) => ({
            name: t.name,
            value: t.repo,
          })),
        },
      ]);
      template = res.template ? String(res.template) : undefined;
    }
    if (!template) {
      console.error('❌ 模板名稱無效');
      process.exit(1);
    }

    await createProject({ name, template });
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
