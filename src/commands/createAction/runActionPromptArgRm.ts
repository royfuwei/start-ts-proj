import { RemoveFileInfoType } from '@/types';
import { promptArgBoolean } from '@/utils/promptArgBoolean';

export async function runActionPromptArgRmFlag(exRmInfoList: RemoveFileInfoType[]) {
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
