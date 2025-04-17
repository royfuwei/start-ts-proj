import { ActionArgsType } from '@/types';
import { promptArgBoolean } from '@/utils/promptArgBoolean';

export async function runCreateActionPromptArgsBoolean(actionArgsParams: ActionArgsType) {
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
    const promptValue = await promptArgBoolean(key, message, value);
    actionArgsParams[key] = promptValue;
  }
}
