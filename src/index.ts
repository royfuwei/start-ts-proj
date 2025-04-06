#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { createProject } from './libs';

const program = new Command();

type TemplateInfo = {
  name: string;
  repo: string;
};

type Options = {
  [key: string]: string | number | boolean | undefined;
};

const getTemplateInfo = () => {
  const templateJson = JSON.parse(
    readFileSync(resolve('./templates.json'), 'utf-8'),
  ) as TemplateInfo[];
  return templateJson ?? <TemplateInfo[]>[];
};

const templates: TemplateInfo[] = getTemplateInfo();

program
  .command('create [name]')
  .description('從 GitHub 模板建立新專案')
  .option('-t, --template <repo>', 'GitHub 模板，如 user/repo')
  .action(async (name?: string, options?: Options) => {
    try {
      if (!name) {
        const res: Options = await inquirer.prompt([
          { type: 'input', name: 'name', message: '請輸入專案名稱' },
        ]);
        name = res.name ? String(res.name) : undefined;
      }
      if (!name) {
        console.error('❌ 專案名稱無效');
        process.exit(1);
      }

      let template: string | undefined = options?.template
        ? String(options.template)
        : undefined;
      if (!template) {
        const res: Options = await inquirer.prompt([
          { type: 'input', name: 'template', message: '請輸入模板 (如 user/repo)' },
        ]);
        template = res.template ? String(res.template) : undefined;
      }
      if (!template) {
        const res: Options = await inquirer.prompt([
          {
            name: 'template',
            message: '請選擇模板',
            type: 'list',
            choices: templates.map((t) => ({
              name: t.name,
              value: t.repo,
            })),
          },
        ]);
        template = res.template ? String(res.template) : undefined;
      }
      if (!template) {
        console.error('❌ 模板名稱無效');
        process.exit(1);
      }

      await createProject({ name, template });
    } catch (error: unknown) {
      if ((error as { name?: string })?.name === 'ExitPromptError') {
        console.log('👋 使用者中斷了輸入（Ctrl+C）');
        process.exit(0);
      } else {
        console.error('❌ 發生錯誤:', error);
        throw error;
      }
    }
  });

program.parse(process.argv);
