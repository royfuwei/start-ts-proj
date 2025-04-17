import { ActionArgsType } from '@/types';
import { promptArgBoolean } from '@/utils/promptArgBoolean';
import { getRmFlagRmList } from './getRmFlagRmList';

export async function runActionPromptArgRmFlag(actionArgsParams: ActionArgsType) {
  const exRmInfoList = getRmFlagRmList(actionArgsParams.rm as string[]);
  if (exRmInfoList.length === 0) {
    return [];
  }
  console.info('-------- Check cli --rm flags');
  for (const item of exRmInfoList) {
    const { field, isRemove } = item;
    if (!isRemove) continue;
    const promptValue = await promptArgBoolean(
      field,
      `確認是否刪除 ${field} 檔案`,
      isRemove,
    );
    item.isRemove = promptValue;
  }
  return exRmInfoList;
}
