/**
 * @type {Partial<jest.InitialOptions>}
 */
const config = {
  preset: 'ts-jest',
  rootDir: '.',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.[jt]s?(x)',
    '<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  testPathIgnorePatterns: ['dist'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  setupFiles: ['<rootDir>/config/setup-tests.js'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};

module.exports = config;
