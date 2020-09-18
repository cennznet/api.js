module.exports = {
  "name": "@cennznet/api",
  "out": "./api_docs",
  "mode": "modules",
  "exclude": [
    "**/node_modules/!(@plugnet|@cennznet)/**",
    "**/node_modules/@cennznet/*/node_modules/**",
    // "**/node_modules/@cennznet/(api|types|util)/**",
    "**/node_modules/@plugnet/**/json.d.ts",
    "**/node_modules/@plugnet/dev/**/*",
    // "**/node_modules/@plugnet/!(api|types)/**",
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
    ["@cennznet/types", "(.*packages\/types\/.*|node_modules\/@cennznet\/types\/.*)", "packages/types/README.md"],
    ["@cennznet/util", "(.*packages\/util\/.*|node_modules\/@cennznet\/util\/.*)", "packages/util/README.md"],
    ["@cennznet/crml-generic-asset", "(.*packages\/crml-generic-asset\/.*|node_modules\/@cennznet\/crml-generic-asset\/.*)", "packages/crml-generic-asset/README.md"],
    ["@cennznet/crml-cennzx-spot", "(.*packages\/crml-cennzx-spot\/.*|node_modules\/@cennznet\/crml-cennzx-spot\/.*)", "packages/crml-cennzx-spot/README.md"],
  ],
  "excludePrivate": true,
  "excludeProtected": true,
  "includeDeclarations": true,
  "ignoreCompilerErrors": true,
  "theme": "markdown",
  "tsconfig": "tsconfig.json",
  "readme": "none"
};
