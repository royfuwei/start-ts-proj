import { ActionArgsType, RnuExecInfoType } from '@/types';

export function getExecList(actionArgsParams: ActionArgsType) {
  const execList: RnuExecInfoType[] = [
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
  const execKeyList = execList.map((item) => item.key);

  Object.entries(actionArgsParams).forEach(([key, value]) => {
    if (execKeyList.includes(key)) {
      execList
        .filter((i) => i.key === key)
        .forEach((item) => {
          item.isExec = Boolean(value);
        });
    }
  });
  return execList;
}
