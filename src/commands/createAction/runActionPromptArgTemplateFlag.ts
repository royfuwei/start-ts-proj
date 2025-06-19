import { configs } from '@/configs';
import { OptionsType } from '@/types';
import inquirer from 'inquirer';

export async function runActionPromptArgTemplateFlag(arg?: string) {
  let template: string | undefined = arg ? String(arg) : undefined;
  if (!template) {
    const res: OptionsType = await inquirer.prompt([
      {
        type: 'input',
        name: 'template',
        message: 'Enter template (e.g. user/repo): (press enter to select from list)',
      },
    ]);
    template = res.template ? String(res.template) : undefined;
  }
  if (!template) {
    const { templates } = configs;
    const res: OptionsType = await inquirer.prompt([
      {
        name: 'template',
        message: 'Select a template',
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
  console.error('❌ Invalid template name');
  process.exit(1);
}
