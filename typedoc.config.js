module.exports = {
  "name": "@cennznet/api",
  "out": "./api_docs",
  "mode": "modules",
  "exclude": [
    "**/node_modules/!(@plugnet)/**",
    "**/node_modules/@plugnet/!(api|types)/**",
    "**/packages/!(api|wallet)/**",
    "scripts/*",
    "*.spec.*",
    "**/test/**",
    "**/build/**"
  ],
  "excludeExternals": false,
  "externalPattern": "**/node_modules/**",
  "external-modulemap": [
    ["@cennznet/api", ".*packages\/api\/.*", "packages/api/README.md"],
    ["@cennznet/wallet", ".*packages\/wallet\/.*", "packages/wallet/README.md"],
    ["@plugnet", ".*\/@plugnet\/.*"],
  ],
  "excludePrivate": true,
  "excludeProtected": true,
  "includeDeclarations": true,
  "ignoreCompilerErrors": true,
  "theme": "markdown",
  "tsconfig": "tsconfig.json",
  "readme": "none"
};
