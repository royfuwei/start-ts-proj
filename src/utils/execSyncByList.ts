import { execSync } from 'child_process';

export function execSyncByList(
  commandList: string[],
  options: {
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    shell?: string;
  } = {},
): void {
  const { cwd, env, shell } = options;
  for (const command of commandList) {
    console.info(`🚀 開始執行 ${command}...`);
    execSync(command, { cwd, env, shell, stdio: 'inherit' });
    console.info(`✅ ${command} 執行完成`);
  }
}
