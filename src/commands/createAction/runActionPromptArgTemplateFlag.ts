import { configs } from '@/configs';
import { OptionsType } from '@/types';
import inquirer from 'inquirer';

export async function runActionPromptArgTemplateFlag(arg?: string) {
  let template: string | undefined = arg ? String(arg) : undefined;
  const res: OptionsType = await inquirer.prompt([
    {
      type: 'input',
      name: 'template',
      message: '請輸入模板 (如 user/repo): (press enter to select template)',
      default: template,
    },
  ]);
  template = res.template ? String(res.template) : undefined;
  if (!template) {
    const { templates } = configs;
    const res: OptionsType = await inquirer.prompt([
      {
        name: 'template',
        message: '請選擇模板',
        type: 'list',
        choices: templates.map((t) => ({
          name: `${t.repo} (${t.name})`,
          value: t.repo,
        })),
      },
    ]);
    template = res.template ? String(res.template) : undefined;
  }
  if (template) return template;
  console.error('❌ 模板名稱無效');
  process.exit(1);
}
