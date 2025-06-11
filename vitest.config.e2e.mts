import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    // ... Specify options here.
    include: ['test/**/*.e2e-test.(ts|js)', 'test/**/*.e2e-spec.(ts|js)'],
    reporters: ['verbose', 'junit', 'html'],
    outputFile: {
      html: '.test/vitest-e2e/html/index.html',
      junit: '.test/vitest-e2e/results.xml',
    },
  },
});
