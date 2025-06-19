import { DOT_FILE_NAMES, RM_FILE_NAMES } from '@/const';
import { ActionArgsType, RemoveFileInfoType } from '@/types';

export function getArgsRmList(actionArgsParams: ActionArgsType) {
  const removeList: RemoveFileInfoType[] = Object.entries(actionArgsParams)
    .filter(([key, value]) => RM_FILE_NAMES.includes(key) && typeof value == 'boolean')
    .map(([key, value]) => {
      let rmFileName = key;
      if (DOT_FILE_NAMES.includes(key)) {
        rmFileName = `.${key}`;
      }
      return {
        field: rmFileName,
        isRemove: !value,
      };
    });
  return removeList;
}
