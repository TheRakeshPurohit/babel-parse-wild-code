module.exports = function (api) {
  const plugins = ['@babel/plugin-proposal-class-properties']
  api.cache.using(() => process.env.OUTPUT_ESM)
  const presets = [
    [
      '@babel/preset-env',
      api.env('es5')
        ? { targets: { node: '12' } }
        : {
            modules: process.env.OUTPUT_ESM ? false : 'auto',
            targets: { node: '12' },
          },
    ],
    ['@babel/preset-typescript', { allowDeclareFields: true }],
  ]

  plugins.push('@babel/plugin-transform-runtime')
  if (api.env('coverage')) {
    plugins.push('babel-plugin-istanbul')
  }

  return { plugins, presets }
}
