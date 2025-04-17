import { RemoveFileInfoType } from '@/types';
import { promptArgsWhileInputs } from '@/utils/promptArgsWhileInputs';

export async function runActionPromptWhileInputsAddRmList(message: string) {
  console.info('-------- Add remove files / folders');
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
