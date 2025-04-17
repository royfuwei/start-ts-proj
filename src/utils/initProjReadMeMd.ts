import { basename, join } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { configs } from '@/configs';

/**
 * @description: init project README.md
 * @param {string} template
 * @param {string} targetDir
 * @return {*}
 */
export function initProjReadMeMd(template: string, targetDir: string): void {
  const projectName = basename(targetDir);
  const filename = 'README.md';
  const startByReadMeMdName = 'START_BY_README.md';
  const readMeMdPath = join(targetDir, filename);
  const startByReadMeMdPath = join(targetDir, startByReadMeMdName);
  const isExists = existsSync(readMeMdPath);
  if (!isExists) return;

  // write START_BY_README.md by original README.md
  const originalReadMeMd = readFileSync(readMeMdPath, 'utf-8');
  writeFileSync(startByReadMeMdPath, originalReadMeMd);

  // write new initial project README.md
  const content = getInitReadMeMdContent(template, projectName);
  writeFileSync(readMeMdPath, content);

  console.info(`📦 ${filename}, ${startByReadMeMdName} initialized.`);
}

/**
 * @description: get initial README.md content
 * @param {string} template
 * @param {string} projectName
 * @return {*}
 */
function getInitReadMeMdContent(template: string, projectName: string): string {
  const description = `This project is a \`${template}\` template for creating a new project using the [${configs.name}](https://www.npmjs.com/package/start-ts-by) CLI.`;
  const content = `${projectName}
===

${description}

## Getting Started

\`\`\`bash
# 1. Install dependencies
npm install
## or pnpm
pnpm install
# 2. Run the project
npm run dev
# 3. Build the project
npm run build
# 4. Run tests
npm run test
# 5. Run lint
npm run lint
\`\`\`

## Release
\`\`\`bash
# 1. Release the project
npx standard-version
## or
npm run release
# dry run
npm run release -- --dry-run

# 2. Release the project with version
npm run release -- --version 1.0.0
\`\`\`

## Reference
- [Original README](./START_BY_README.md)
  `;
  return content;
}
