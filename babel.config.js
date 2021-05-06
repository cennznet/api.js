module.exports = {
  extends: '@polkadot/dev/config/babel-config-cjs.cjs',
  "plugins": [
    ["@babel/plugin-proposal-private-methods", { "loose": true }]
  ]
};
