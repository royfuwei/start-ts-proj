import { ActionArgsType, RemoveFileInfoType } from '@/types';

export function getArgsRmList(actionArgsParams: ActionArgsType) {
  const dotFileNames = ['husky', 'github'];
  const rmFileNames = ['husky', 'github'];
  const removeList: RemoveFileInfoType[] = Object.entries(actionArgsParams)
    .filter(([key, value]) => rmFileNames.includes(key) && typeof value == 'boolean')
    .map(([key, value]) => {
      let rmFileName = key;
      if (dotFileNames.includes(key)) {
        rmFileName = `.${key}`;
      }
      return {
        field: rmFileName,
        isRemove: !value,
      };
    });
  return removeList;
}
