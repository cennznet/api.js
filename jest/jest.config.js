module.exports = {
    // globals: {
    //     'ts-jest': {
    //         tsConfig: 'tsconfig.json',
    //     },
    // },
    rootDir: process.cwd(),
    moduleFileExtensions: ['ts', 'js', 'node', 'json'],
    // transform: {
    //     '^.+\\.tsx?$': 'ts-jest',
    // },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
    },
    testMatch: ['/**/?(*.)+(spec|e2e).[jt]s?(x)'],
    testEnvironment: 'node',
    // preset: 'ts-jest',
    collectCoverageFrom: [
        'packages/wallet/src/**/*.[jt]s?(x)',
        '!**/node_modules/**'
    ],
    coverageReporters: ['json', 'html'],
    coverageThreshold: {
        global: {
            branches: 60,
            functions: 80,
            lines: 80,
            statements: -10,
        },
    },
    testEnvironment: './jest/env.js',
    moduleNameMapper: {
        '@cennznet/api(.*)$': '<rootDir>/packages/api/src/$1',
        '@cennznet/types(.*)$': '<rootDir>/packages/types/src/$1',
        '@cennznet/util(.*)$': '<rootDir>/packages/util/src/$1',
        '@cennznet/wallet(.*)$': '<rootDir>/packages/wallet/src/$1'
    },
    modulePathIgnorePatterns: [
        '<rootDir>/packages/api/build',
        '<rootDir>/packages/types/build',
        '<rootDir>/packages/util/build',
        '<rootDir>/packages/wallet/build',
    ],
    setupFilesAfterEnv: ['./jest/jest.setup.js']
};
