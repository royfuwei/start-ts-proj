import { ActionArgsType } from '@/types';
import { promptArgBoolean } from '@/utils/promptArgBoolean';

export async function runActionPromptCheckArgs(actionArgsParams: ActionArgsType) {
  console.info('-------- Check CLI flags');
  const info = [
    { key: 'husky', message: 'Keep husky?' },
    { key: 'github', message: 'Keep GitHub Actions?' },
    { key: 'gitInit', message: 'Initialize git?' },
    { key: 'npmInstall', message: 'Install dependencies?' },
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
