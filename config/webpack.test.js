const webpackMerge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common');
const { ENV, dir } = require('./helpers');

module.exports = function(env) {
  return webpackMerge(commonConfig({ env: ENV }), {
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
      exprContextCritical: false,
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: /(node_modules)/
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.ts$/,
          // exclude: /node_modules|vue\/src/,
          exclude: [/\.e2e\.ts$/, /(node_modules)/],
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        },
        // {
        //   enforce: 'post',
        //   test: /\.(js|ts|vue)$/,
        //   loader: 'istanbul-instrumenter-loader',
        //   options: { esModules: true },
        //   include: dir('src'),
        //   exclude: [
        //     /\.(e2e|spec)\.ts$/,
        //     /node_modules/
        //   ]
        // }
      ]
    },
    node: {
      global: true,
      process: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  });
};
