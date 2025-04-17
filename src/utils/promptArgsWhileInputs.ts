import { OptionsType } from '@/types';
import inquirer from 'inquirer';

export async function promptArgsWhileInputs(message: string) {
  const inputs: string[] = [];
  while (true) {
    const res: OptionsType = await inquirer.prompt([
      {
        type: 'input',
        name: 'value',
        message,
      },
    ]);
    if (!res.value) break;
    inputs.push(String(res.value));
  }
  return inputs;
}
