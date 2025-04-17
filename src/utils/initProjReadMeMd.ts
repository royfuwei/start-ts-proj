import { basename, join } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { configs } from '@/configs';

function getInitReadMeMdContent(template: string, projectName: string) {
  const title = `# ${projectName}`;
  const description = `A project is use ${configs.name} created by ${template}`;
  const content = `# ${title}
${description}
## Getting Started
1. Install dependencies
   \`\`\`bash
   npm install
   \`\`\`
2. Run the project
   \`\`\`bash
   npm run dev
   \`\`\`
3. Build the project
   \`\`\`bash
   npm run build
   \`\`\`
4. Run tests
   \`\`\`bash
   npm run test
   \`\`\`
5. Run lint
   \`\`\`bash
   npm run lint
   \`\`\`

## Release
1. Release the project
   \`\`\`bash
   npm run release
   # dry run
   npm run release -- --dry-run
   \`\`\`
2. Release the project with version
   \`\`\`bash
   npm run release -- --version 1.0.0
   \`\`\`

## Reference
- [Original README](./START_BY_README.md)
  `;
  return content;
}

export function initProjReadMeMd(template: string, targetDir: string) {
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
  console.info(`📁 ${startByReadMeMdName} created`);

  // write new initial project README.md
  const content = getInitReadMeMdContent(template, projectName);
  writeFileSync(readMeMdPath, content);
  console.info(`📁 Project ${filename} created`);
}
