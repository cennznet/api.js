const config = require('../../jest/jest.config')

const newConfig = {
    ...config,
    coveragePathIgnorePatterns: [
        "<rootDir>/src/Base.ts",
        "<rootDir>/src/Api.ts",
        "<rootDir>/src/index.ts"
    ]
}

module.exports = newConfig;