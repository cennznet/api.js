module.exports = {
  "name": "@cennznet/api",
  "out": "./api_docs",
  "entryPoints": ["packages/api/src"],
  "exclude": [
    "**/node_modules",
    "**/packages/**",
    "scripts/*",
    "*.e2e.ts",
    "*.spec.*",
    "**/test/**",
    "**/build/**"
  ],
  "excludeExternals": false,
  "externalPattern": "**/node_modules/**",
  "excludePrivate": true,
  "excludeProtected": true,
  "theme": "markdown",
  "tsconfig": "tsconfig.json",
  "readme": "none"
};
