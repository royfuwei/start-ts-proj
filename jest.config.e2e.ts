export default {
  displayName: 'ts-template-e2e',
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/../src/$1',
  },
  rootDir: 'test',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/../tsconfig.spec.json' }],
  },
  testRegex: '.*\\.e2e-(spec|test)\\.ts$',
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../.test/jest-e2e/coverage',
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '.test/jest-e2e',
        outputName: 'results.xml',
      },
    ],
    [
      'jest-html-reporter',
      {
        pageTitle: 'Test Report',
        outputPath: '.test/jest-e2e/index.html',
      },
    ],
  ],
};
