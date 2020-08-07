module.exports = {
  extends: '@polkadot/dev/config/babel',
  /* Condition compile plugin to exclude the wasm package for doughnuts */
  "plugins": [
    ["conditional-compile", {
      "define": {
        "DOUGHNUT_SUPPORT": false
      }
    }]
  ]
};