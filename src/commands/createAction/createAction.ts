import { createProject } from '@/libs';
import {
  ActionArgsType,
  ActionCommandType,
  CreateProjectParams,
  PromptCheckArgsType,
  RnuExecInfoType,
} from '@/types';
import { runActionPromptArgTemplateFlag } from './runActionPromptArgTemplateFlag';
import { runActionPromptName } from './runActionPromptName';
import { getArgsRmList } from './getArgsRmList';
import { getExecList } from './getExecList';
import { runActionPromptCheckArgs } from './runActionPromptCheckArgs';
import { runActionPromptWhileInputsAddRmList } from './runActionPromptWhileInputsAddRmList';
import { runActionPromptArgRmFlag } from './runActionPromptArgRmFlag';

export async function createAction(name?: string, actionArgs?: ActionArgsType) {
  try {
    console.log('🚀 Creating project...');
    const actionArgsParams = actionArgs ?? {};
    const skipPrompt = actionArgsParams.skipPrompt as boolean;

    const projectName = await runActionPromptName(name);

    const template = await runActionPromptArgTemplateFlag(
      actionArgsParams.template as string,
    );

    if (!skipPrompt)
      await runActionPromptCheckArgs(actionArgsParams, actionPromptCheckArgs);

    // Get files/folders to remove
    const paramArgsRmList = getArgsRmList(
      actionArgsParams,
      actionRmFileNames,
      actionDotFileNames,
    );

    const promptRmFlagRmList = skipPrompt
      ? []
      : await runActionPromptArgRmFlag(actionArgsParams);
    const promptInputsRmList = skipPrompt
      ? []
      : await runActionPromptWhileInputsAddRmList(
          'Enter files/folders to remove (press double enter to skip):',
        );
    const finalRemoveList = paramArgsRmList
      .concat(promptRmFlagRmList)
      .concat(promptInputsRmList);

    // execList
    const paramArgsExecList = getExecList(actionArgsParams, actionExecList);
    const finalExecList = paramArgsExecList;

    const params: CreateProjectParams = {
      name: projectName,
      template,
      removeList: finalRemoveList,
      execList: finalExecList,
    };

    await createProject(params);
  } catch (error: unknown) {
    if ((error as { name?: string })?.name === 'ExitPromptError') {
      console.log('👋 Input aborted by user (Ctrl+C)');
      process.exit(0);
    } else {
      const errorMessage = (error as { message?: string })?.message;
      if (errorMessage) {
        console.error('❌ Error:', errorMessage);
      } else {
        console.error('❌ Error:', error);
      }
      process.exit(1);
    }
  }
}

export const actionExecList: RnuExecInfoType[] = [
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

export const actionDotFileNames = ['husky', 'github'];
export const actionRmFileNames = ['husky', 'github'];

export const actionPromptCheckArgs: PromptCheckArgsType[] = [
  { key: 'husky', message: 'Keep husky?' },
  { key: 'github', message: 'Keep GitHub Actions?' },
  { key: 'gitInit', message: 'Initialize git?' },
  { key: 'npmInstall', message: 'Install dependencies?' },
];

export const createActionCommand: ActionCommandType = {
  name: 'create',
  description: 'Create a new project from a git template (Default)',
  flagsOptions: [
    {
      flags: '-t, --template <repo>',
      description:
        'Template source, e.g. user/repo, git@domain:group/repo.git, ./local-folder',
    },
    {
      flags: '--skip-prompt',
      description: 'Skip prompt',
      defaultValue: false,
    },
    {
      flags: '--rm <files...>',
      description: 'Remove files/folders after project creation',
      defaultValue: [],
    },
    {
      flags: '--no-husky',
      description: 'Remove .husky',
    },
    {
      flags: '--github',
      description: 'Keep .github/workflows',
      defaultValue: false,
    },
    {
      flags: '--git-init',
      description: 'Run git init after creation',
      defaultValue: false,
    },
    {
      flags: '--npm-install',
      description: 'Run npm install after creation',
      defaultValue: false,
    },
  ],
  commandOptions: {
    isDefault: true,
  },
  action: createAction,
};
