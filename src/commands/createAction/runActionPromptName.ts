import { OptionsType } from '@/types';
import { getTargetDir } from '@/utils';
import inquirer from 'inquirer';

export async function runActionPromptName(arg?: string) {
  let name: string | undefined = arg ? String(arg) : undefined;
  if (!name) {
    const res: OptionsType = await inquirer.prompt([
      { type: 'input', name: 'name', message: 'Enter project name', default: 'my-app' },
    ]);
    name = res.name ? String(res.name) : undefined;
  }
  if (name) {
    getTargetDir(name);
    return name;
  }
  console.error('❌ Invalid project name');
  process.exit(1);
}
