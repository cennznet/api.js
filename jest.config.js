module.exports = {
  collectCoverageFrom: ['packages/**/*.js', '!src/**/*.test.js', '!src/**/*.spec.js', '!src/**/*.e2e.js'],
  cacheDirectory: '<rootDir>/jest_cache',
  // testRegex: '__tests__/.*\\.test\\.js$',

  moduleFileExtensions: ['ts', 'js', 'node', 'json'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['/**/?(*.)+(test|spec|e2e).[jt]s?(x)'],
  // testEnvironment: 'node',
  // testEnvironment: './jest/env.js',
  moduleNameMapper: {
    '@cennznet/api(.*)$': '<rootDir>/packages/api/src/$1',
    '@cennznet/crml-attestation(.*)$': '<rootDir>/packages/crml-attestation/src/$1',
    '@cennznet/crml-generic-asset(.*)$': '<rootDir>/packages/crml-generic-asset/src/$1',
    '@cennznet/crml-cennzx-spot(.*)$': '<rootDir>/packages/crml-cennzx-spot/src/$1',
    '@cennznet/types(.*)$': '<rootDir>/packages/types/src/$1',
    '@cennznet/util(.*)$': '<rootDir>/packages/util/src/$1',
    '@cennznet/wallet(.*)$': '<rootDir>/packages/wallet/src/$1',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/packages/api/build',
    '<rootDir>/packages/crml-attestation/build',
    '<rootDir>/packages/crml-generic-asset/build',
    '<rootDir>/packages/crml-cennzx-spot/build',
    '<rootDir>/packages/types/build',
    '<rootDir>/packages/util/build',
    '<rootDir>/packages/wallet/build',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest/jestSetup.js'],
};
