module.exports = {
  "name": "@cennznet/api",
  "out": "./api_docs",
  "mode": "modules",
  "exclude": [
    "**/node_modules/!(@plugnet|@cennznet)/**",
    "**/node_modules/@cennznet/*/node_modules/**",
    "**/node_modules/@plugnet/**/json.d.ts",
    "**/node_modules/@plugnet/dev/**/*",
    "**/packages/**",
    "scripts/*",
    "*.spec.*",
    "**/test/**",
    "**/build/**"
  ],
  "excludeExternals": false,
  "externalPattern": "**/node_modules/**",
  "external-modulemap": [
    ["@cennznet/api", "(.*packages\/api\/.*|node_modules\/@cennznet\/api\/.*)", "packages/api/README.md"],
    ["@cennznet/types", "(.*packages\/types\/.*|node_modules\/@cennznet\/types\/.*)", "packages/types/README.md"]
  ],
  "excludePrivate": true,
  "excludeProtected": true,
  "includeDeclarations": true,
  "ignoreCompilerErrors": true,
  "theme": "markdown",
  "tsconfig": "tsconfig.json",
  "readme": "none"
};
