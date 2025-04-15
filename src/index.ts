#!/usr/bin/env node

import { Command } from 'commander';
import { configs } from '@/configs';
import { createActionCommand } from '@/commands';
import { setProgramCommand } from '@/libs';

function main() {
  const program = new Command();

  program.name(configs.name).description(configs.description).version(configs.version);

  /* command */
  setProgramCommand(program, 'create [name]', createActionCommand);

  program.parse(process.argv);
}

main();
