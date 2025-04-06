// copyPackageJsonPlugin.js
import fs from 'fs';
import path from 'path';

const copyPackageJsonFn = async (distDir) => {
  // 1) 讀取根目錄的 package.json
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

  // 2) 根據需求刪除或改寫欄位
  //    例如刪除 devDependencies、scripts 等
  delete pkg.main;
  delete pkg.module;
  delete pkg.types;
  delete pkg.exports;
  delete pkg.devDependencies;
  delete pkg.scripts;
  delete pkg['lint-staged'];
  delete pkg.config;
  delete pkg.packageManager;

  // 3) 如果要指定新的 main/module/types
  //    （通常你會在 dist 內成為新的根）
  pkg.bin = {
    [pkg.name]: './bin/index.js',
  };
  pkg.type = 'module';

  // 4) 寫回 distDir 中
  const outPath = path.join(distDir, 'package.json');
  fs.writeFileSync(outPath, JSON.stringify(pkg, null, 2), 'utf-8');
  console.log(`\nPackage.json copied to: ${outPath}`);
};

export function copyPackageJsonPlugin(
  options = {
    distDir: 'dist',
  },
) {
  const { distDir, type } = options;
  const name = type ? `${type}-copy-package-json-plugin` : 'copy-package-json-plugin';
  switch (type) {
    case 'rollup':
      return {
        name: name,
        writeBundle() {
          copyPackageJsonFn(distDir);
        },
      };
    case 'esbuild':
      return {
        name: name,
        setup(build) {
          build.onEnd(() => copyPackageJsonFn(distDir));
        },
      };
    default:
      return copyPackageJsonFn(distDir);
  }
}

export const esbuildCopyPackageJsonPlugin = (options = {}) =>
  copyPackageJsonPlugin({
    ...options,
    type: 'esbuild',
  });

export const rollupCopyPackageJsonPlugin = (options = {}) =>
  copyPackageJsonPlugin({
    ...options,
    type: 'rollup',
  });
