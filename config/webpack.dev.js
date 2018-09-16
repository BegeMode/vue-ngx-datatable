const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = require('./webpack.common');
const { ENV, dir } = require('./helpers');

module.exports = function(options) {
  return webpackMerge(commonConfig({ env: ENV }), {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      port: 9998,
      hot: true, // options.HMR,
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
      }
    },
    entry: {
      'app': './demo/bootstrap.ts',
      // 'polyfills': './demo/polyfills.ts'
    },
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
          enforce: 'pre',
          test: /\.ts$/,
          loader: 'tslint-loader',
          exclude: /(node_modules|release|dist|demo)/
        },
        {
          test: /\.ts$/,
          exclude: /node_modules|\.(spec|e2e|d)\.ts$|vue\/src/,
          // exclude: [/\.(spec|e2e|d)\.ts$/]
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
      ]
    },
    plugins: [
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: ['polyfills'],
      //   minChunks: Infinity
      // }),
      new HtmlWebpackPlugin({
        template: 'demo/index.ejs',
        chunksSortMode: 'dependency',
        title: 'ngx-datatable'
      }),
      new WebpackNotifierPlugin({
        excludeWarnings: true
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  });

};
