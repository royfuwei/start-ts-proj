import { RnuExecInfoType } from './types';

export const DOT_FILE_NAMES = ['husky', 'github'];
export const RM_FILE_NAMES = ['husky', 'github'];
export const EXEC_LIST: RnuExecInfoType[] = [
  {
    key: 'gitInit',
    command: 'git init',
    isExec: true,
  },
  {
    key: 'npmInstall',
    command: 'npm install',
    isExec: true,
  },
];
