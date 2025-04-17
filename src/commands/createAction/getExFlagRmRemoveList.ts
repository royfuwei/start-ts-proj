import { RemoveFileInfoType } from '@/types';

export function getExFlagRmRemoveList(rmList: string[]) {
  const removeList: RemoveFileInfoType[] = rmList.map((item) => {
    return {
      field: item,
      isRemove: true,
    };
  });
  return removeList;
}
