import { RemoveFileInfoType } from '@/types';
import { promptArgsWhileInputs } from '@/utils/promptArgsWhileInputs';

export async function runGetRemoveFilesByPromptArgsWhileInputs(message: string) {
  const inputs = await promptArgsWhileInputs(message);
  if (inputs.length === 0) {
    return [];
  }
  const result = inputs.map((item) => {
    const data: RemoveFileInfoType = {
      field: item,
      isRemove: true,
    };
    return data;
  });
  return result;
}
