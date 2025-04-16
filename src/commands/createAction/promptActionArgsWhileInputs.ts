import { OptionsType, RemoveFileInfoType } from '@/types';
import inquirer from 'inquirer';

export async function promptActionArgsWhileInputs(message: string) {
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

export async function getRemoveListByPromptActionArgsWhileInputsCreateAction(
  message: string,
) {
  const inputs = await promptActionArgsWhileInputs(message);
  if (inputs.length === 0) {
    return [];
  }
  const result = inputs.map((item) => {
    const data: RemoveFileInfoType = {
      field: item,
      isRemove: true,
    };
    return data;
  });
  return result;
}
