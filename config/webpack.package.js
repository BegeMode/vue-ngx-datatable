const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const { ENV, dir, APP_VERSION } = require('./helpers');
// const ngtools = require('@ngtools/webpack');

const banner =
`/**
 * vue-data-table v${APP_VERSION} (https://github.com/begemode/vue-ngx-data-table)
 * Copyright 2018
 * Licensed under MIT
 */`;

module.exports = function(env) {
  return webpackMerge(commonConfig({ env: ENV }), {
    devtool: 'source-map',
    mode: 'production',
    module: {
      exprContextCritical: false,
      rules: [
        {
          enforce: 'pre',
          test: /\.ts$/,
          loader: 'tslint-loader',
          exclude: /(node_modules|release|dist|demo)/
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          },
          exclude: [/\.(spec|e2e|d)\.ts$/]
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
      ]
    },
    entry: {
      'index': './src/components/datatable.component.ts'
    },
    output: {
      path: dir('release'),
      libraryTarget: 'umd',
      library: 'ngxDatatable',
      umdNamedDefine: true
    },
    externals: {
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.BannerPlugin({
        banner: banner,
        raw: true,
        entryOnly: true
      }),
      /*
      new ngtools.AotPlugin({
        tsConfigPath: 'tsconfig-aot.json',
        baseDir: dir()
        entryModule: dir('datatable.module.ts') + '#Angular2DataTableModule'
      }),
      new CleanWebpackPlugin(['release'], {
        root: dir(),
        verbose: false,
        dry: false
      })
      */
    ]
  });

};
