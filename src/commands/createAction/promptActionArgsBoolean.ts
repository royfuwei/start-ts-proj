import { ActionArgsType, OptionsType } from '@/types';
import inquirer from 'inquirer';

export async function promptActionArgBoolean(
  actionArgsParams: ActionArgsType,
  key: string,
  message: string,
) {
  const paramValue = actionArgsParams[key];
  if (paramValue == undefined || typeof paramValue !== 'boolean') {
    return;
  }
  const res: OptionsType = await inquirer.prompt([
    { type: 'confirm', name: key, message, default: paramValue },
  ]);
  const value = res[`${key}`] !== undefined ? Boolean(res[`${key}`]) : paramValue;
  actionArgsParams[key] = value;
}

export async function promptActionArgBooleanCreateAction(
  actionArgsParams: ActionArgsType,
) {
  const info = [
    { key: 'husky', message: '是否保留 husky？' },
    { key: 'github', message: '是否保留 github action？' },
    { key: 'gitInit', message: '是否初始化 git？' },
    { key: 'npmInstall', message: '是否安裝依賴？' },
  ];
  for (const item of info) {
    await promptActionArgBoolean(actionArgsParams, item.key, item.message);
  }
}
