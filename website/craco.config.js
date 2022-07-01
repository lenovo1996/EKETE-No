const CracoLessPlugin = require('craco-less')

module.exports = {
  style: {
    modules: {
        localIdentName: ""
    },
    css: {
        loaderOptions: { /* Any css-loader configuration options: https://github.com/webpack-contrib/css-loader. */ },
        loaderOptions: (cssLoaderOptions, { env, paths }) => { return cssLoaderOptions; }
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#5F73E2' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
