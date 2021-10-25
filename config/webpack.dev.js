const webpack = require('webpack');
const { merge } = require('webpack-merge');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = require('./webpack.common');
const { ENV, dir } = require('./helpers');

module.exports = function(options) {
  return merge(commonConfig({ env: ENV }), {
    mode: 'development',
    devtool: 'inline-source-map',
    stats: {
      colors: true,
      hash: true,
      timings: true,
      chunks: true,
      chunkModules: false,
      children: false,
      modules: false,
      reasons: false,
      warnings: true,
      assets: false,
      version: false
    },
    devServer: {
      port: 9998,
      hot: true,
    },
    entry: {
      'app': './demo/bootstrap.ts',
    },
    module: {
      exprContextCritical: false,
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules|\.(spec|e2e|d)\.ts$|vue\/src/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'demo/index.ejs',
        chunksSortMode: 'auto',
        title: 'vue-ngx-datatable'
      }),
      new WebpackNotifierPlugin({
        excludeWarnings: true
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  });

};
