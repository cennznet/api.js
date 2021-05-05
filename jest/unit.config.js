module.exports = {
  rootDir: '../',
  collectCoverageFrom: ['packages/**/*.js', '!src/**/*.test.js', '!src/**/*.spec.js', '!src/**/*.e2e.js'],
  cacheDirectory: '<rootDir>/jest_cache',
  moduleFileExtensions: ['ts', 'js', 'node', 'json'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['/**/?(*.)+(spec).[jt]s?(x)'],
  testEnvironment: './jest/env.js',
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
  transformIgnorePatterns: ['/node_modules/(?!@polkadot|@babel/runtime/helpers/esm/)']
};
