import { ActionCommandType } from '@/types';
import { Command } from 'commander';

export function setProgramCommand(
  program: Command,
  nameAndArgs: string,
  actionCommand: ActionCommandType,
) {
  const { action, description, flagsOptions, commandOptions } = actionCommand;
  const programCommand = program.command(nameAndArgs, commandOptions);
  programCommand.description(description);
  for (const flagsOption of flagsOptions) {
    const { flags, description, defaultValue } = flagsOption;
    programCommand.option(flags, description, defaultValue);
  }
  programCommand.action(action);
}
