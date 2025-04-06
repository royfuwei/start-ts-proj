// copyFilesPlugin.js
import fs from 'fs';
import path from 'path';

const copyFilesFn = async (distDir, files) => {
  files = files || [];
  console.log(`\nCopying ${files.join(', ')} files to: ${distDir}`);
  for (const file of files) {
    try {
      fs.accessSync(file, fs.constants.R_OK);
    } catch (err) {
      console.error(`\nFile not found: ${file}`);
      continue;
    }
    const srcPath = path.join(file);
    const destPath = path.join(distDir, file);
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(srcPath, destPath);
    console.log(`\nFile copied to: ${destPath}`);
  }
};

export function copyFilesPlugin(
  options = {
    distDir: 'dist',
    files: [],
  },
) {
  const { distDir, type, files } = options;
  const name = type ? `${type}-copy-files-plugin` : 'copy-files-plugin';
  switch (type) {
    case 'rollup':
      return {
        name: name,
        writeBundle() {
          copyFilesFn(distDir, files);
        },
      };
    case 'esbuild':
      return {
        name: name,
        setup(build) {
          build.onEnd(() => copyFilesFn(distDir, files));
        },
      };
    default:
      return copyFilesFn(distDir, files);
  }
}

export const esbuildCopyFilesPlugin = (options = {}) =>
  copyFilesPlugin({
    ...options,
    type: 'esbuild',
  });

export const rollupCopyFilesPlugin = (options = {}) =>
  copyFilesPlugin({
    ...options,
    type: 'rollup',
  });
