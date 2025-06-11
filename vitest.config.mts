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
    include: ['src/**/*.test.(ts|js)', 'src/**/*.spec.(ts|js)'],
    reporters: ['verbose', 'junit', 'html'],
    outputFile: {
      html: '.test/vitest/html/index.html',
      junit: '.test/vitest/results.xml',
    },
    coverage: {
      enabled: true,
      all: true,
      include: ['src/*'],
      provider: 'istanbul', // or 'v8'
      reportsDirectory: '.test/vitest/coverage',
    },
  },
});
