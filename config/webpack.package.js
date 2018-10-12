const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const { ENV, dir, APP_VERSION } = require('./helpers');
// const ngtools = require('@ngtools/webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const banner =
`/**
 * vue-data-table v${APP_VERSION} (https://github.com/begemode/vue-ngx-data-table)
 * Copyright 2018
 * Licensed under MIT
 */`;

module.exports = function(env) {
  return webpackMerge(commonConfig({ env: ENV }), {
    devtool: 'source-map',
    mode: 'development',
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
      'index': './src/components/datatable.component.vue'
    },
    output: {
      path: dir('release'),
      libraryTarget: 'umd',
      library: 'ngxDatatable',
      umdNamedDefine: true
    },
    externals: {
      'vue': 'vue/dist/vue.esm.js',
      'Vue': 'vue/dist/vue.esm.js',
      'vue-property-decorator': 'vue-property-decorator',
      'vue-class-component': 'vue-class-component',
      // 'vue-style-loader': 'vue-style-loader/lib/',
      // 'vue-loader': 'vue-loader/lib/runtime',
      // 'css-loader': 'css-loader/lib',
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.BannerPlugin({
        banner: banner,
        raw: true,
        entryOnly: true
      }),
      // new BundleAnalyzerPlugin(),
      /*
      new CleanWebpackPlugin(['release'], {
        root: dir(),
        verbose: false,
        dry: false
      })
      */
    ]
  });

};
