import degit from 'degit';

export async function degitTemplateToLocal(targetDir: string, template: string) {
  console.log(`📥 從 GitHub 下載模板 ${template}...`);
  const emitter = degit(template, { cache: false, force: true });
  await emitter.clone(targetDir);
  return emitter;
}
