import { ActionArgsType, OptionsType } from '@/types';
import inquirer from 'inquirer';

export async function promptActionArgsBoolean(
  key: string,
  message: string,
  defaultValue: boolean,
) {
  const res: OptionsType = await inquirer.prompt([
    { type: 'confirm', name: key, message, default: defaultValue },
  ]);
  const value = res[`${key}`] !== undefined ? Boolean(res[`${key}`]) : defaultValue;
  return value;
}

export async function promptActionArgsBooleanCreateAction(
  actionArgsParams: ActionArgsType,
) {
  const info = [
    { key: 'husky', message: '是否保留 husky？' },
    { key: 'github', message: '是否保留 github action？' },
    { key: 'gitInit', message: '是否初始化 git？' },
    { key: 'npmInstall', message: '是否安裝依賴？' },
  ];
  for (const item of info) {
    const { key, message } = item;
    const value = actionArgsParams[key];
    if (value === undefined) continue;
    if (typeof value !== 'boolean') continue;
    const promptValue = await promptActionArgsBoolean(key, message, value);
    actionArgsParams[key] = promptValue;
  }
}
