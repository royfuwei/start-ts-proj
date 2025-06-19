import { ActionArgsType, RnuExecInfoType } from '@/types';

export function getExecList(
  actionArgsParams: ActionArgsType,
  execList: RnuExecInfoType[],
) {
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
