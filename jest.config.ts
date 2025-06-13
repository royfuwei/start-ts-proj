export default {
  displayName: 'ts-template',
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/$1',
  },
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../.test/jest/coverage',
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '.test/jest',
        outputName: 'results.xml',
      },
    ],
    [
      'jest-html-reporter',
      {
        pageTitle: 'Test Report',
        outputPath: '.test/jest/index.html',
      },
    ],
  ],
};
