module.exports = {
  presets: [
    ['@babel/preset-env', {
        modules: 'commonjs',
        targets: {
          browsers: '>0.25% and last 2 versions and not ie 11 and not OperaMini all',
          node: '10'
        }
    }],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-private-methods', { loose: true }]
  ]
};
