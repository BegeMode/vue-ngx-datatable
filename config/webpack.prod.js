const webpack = require('webpack');
const { merge } = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const { ENV, dir } = require('./helpers');

module.exports = function(env) {
  return merge(commonConfig({ env: ENV }), {
    devtool: 'source-map',
    mode: 'production',
    entry: {
      'app': './demo/bootstrap.ts',
      // 'polyfills': './demo/polyfills.ts'
    },
    module: {
      exprContextCritical: false,
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          },
          // exclude: [/\.(spec|e2e|d)\.ts$/]
          exclude: /node_modules|\.(spec|e2e|d)\.ts$|vue\/src/,
        },
      ]
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new HtmlWebpackPlugin({
        template: 'demo/index.ejs',
        chunksSortMode: 'dependency',
        title: 'ngx-datatable',
        // googleAnalytics: {
        //   trackingId: 'UA-57474611-3',
        //   pageViewOnLoad: true
        // }
      }),
      new CleanWebpackPlugin(['dist'], {
        root: dir(),
        verbose: false,
        dry: false
      }),
      // new webpack.optimize.UglifyJsPlugin()
    ]
  });

};
