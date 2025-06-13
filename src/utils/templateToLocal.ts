import { cpSync, existsSync, rmSync, mkdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import { ParsedTemplateType } from '@/types';

export function templateToLocal(parsed: ParsedTemplateType, targetDir: string) {
  if (parsed.isLocal) {
    // ==== Local Path ====
    let fromDir = parsed.repoUrl;
    if (parsed.subdir) {
      fromDir = join(parsed.repoUrl, parsed.subdir);
      if (!existsSync(fromDir)) throw new Error(`本地子目錄不存在: ${fromDir}`);
    }
    mkdirSync(targetDir, { recursive: true });
    cpSync(fromDir, targetDir, { recursive: true });
    return;
  }

  // ==== 遠端 Git ====
  // 產生暫存目錄
  const tmpDir = `${targetDir}_tmp_${Date.now()}`;
  mkdirSync(tmpDir, { recursive: true });
  // 組合 git clone 指令
  const cloneCmd = parsed.ref
    ? `git clone --depth 1 --branch ${parsed.ref} ${parsed.repoUrl} "${tmpDir}"`
    : `git clone --depth 1 ${parsed.repoUrl} "${tmpDir}"`;
  execSync(cloneCmd, { stdio: 'inherit' });

  // ==== subdir 複製 ====
  let fromDir = tmpDir;
  if (parsed.subdir) {
    fromDir = join(tmpDir, parsed.subdir);
    if (!existsSync(fromDir)) throw new Error(`遠端子目錄不存在: ${fromDir}`);
  }
  mkdirSync(targetDir, { recursive: true });
  cpSync(fromDir, targetDir, { recursive: true });

  // 清理暫存
  rmSync(tmpDir, { recursive: true, force: true });
}
