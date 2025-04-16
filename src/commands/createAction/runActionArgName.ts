import { OptionsType } from '@/types';
import inquirer from 'inquirer';

export async function runActionArgName(arg?: string) {
  let name: string | undefined = arg ? String(arg) : undefined;
  if (!name) {
    const res: OptionsType = await inquirer.prompt([
      { type: 'input', name: 'name', message: '請輸入專案名稱', default: 'my-app' },
    ]);
    name = res.name ? String(res.name) : undefined;
  }
  if (name) return name;
  console.error('❌ 專案名稱無效');
  process.exit(1);
}
