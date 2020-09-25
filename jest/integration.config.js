module.exports = {
  rootDir: '../',
  collectCoverageFrom: ['packages/**/*.js', '!src/**/*.test.js', '!src/**/*.spec.js', '!src/**/*.e2e.js'],
  cacheDirectory: '<rootDir>/jest_cache',
  // testRegex: '__tests__/.*\\.test\\.js$',
  moduleFileExtensions: ['ts', 'js', 'node', 'json'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['<rootDir>/packages/api/**/?(*.)+(e2e).[jt]s?(x)'],
  testEnvironment: '<rootDir>/jest/env.js',
  moduleNameMapper: {
    '@cennznet/api(.*)$': '<rootDir>/packages/api/src/$1',
    '@cennznet/types(.*)$': '<rootDir>/packages/types/src/$1',
    '@cennznet/util(.*)$': '<rootDir>/packages/util/src/$1',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/packages/api/build',
    '<rootDir>/packages/types/build',
    '<rootDir>/packages/util/build',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest/jest.init.js'],
  globals: {
    // Enable doughnut wasm package while running integration tests
    DOUGHNUT_SUPPORT: true
  }
  // globalSetup: '<rootDir>/jest/jest.setup.js',
  // globalTeardown: '<rootDir>/jest/jest.teardown.js',
};
