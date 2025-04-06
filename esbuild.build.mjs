// esbuild.build.js
import esbuild from 'esbuild';
import { copyPackageJsonPlugin } from './scripts/copyPackageJsonPlugin.mjs';
import { copyFilesPlugin } from './scripts/copyFilesPlugin.mjs';
import path from 'path';
import fs from 'fs';

const distDir = 'dist';
const inputFile = 'src/index.ts';

// 讀取 root package.json，標記 external
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const externalDeps = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

const copyFiles = JSON.parse(fs.readFileSync('./copyFiles.json', 'utf-8')) ?? [];

const sharedConfig = {
  entryPoints: [inputFile],
  bundle: true,
  platform: 'node', // library 通常 neutral, 或 browser/node 看需求
  tsconfig: './tsconfig.esbuild.json', // 使用 tsconfig.json 設定
  target: ['node20'],
  external: ['node:*'].concat(externalDeps), // 不要把相依套件打包進來
  // minify: true,       // 需壓縮可開啟
};

async function buildBin() {
  // 1) ESM 輸出
  await esbuild.build({
    ...sharedConfig,
    outfile: path.join(distDir, 'bin/index.js'),
    format: 'esm',
    plugins: [],
  });

  // 2) 複製 package.json
  await copyPackageJsonPlugin({
    distDir,
  });

  await copyFilesPlugin({
    distDir,
    files: ['README.md', 'LICENSE'].concat(copyFiles),
  });
}

buildBin().catch(() => process.exit(1));
