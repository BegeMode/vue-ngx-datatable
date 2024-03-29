const webpack = require('webpack');
const { merge } = require('webpack-merge');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const { ENV, dir, APP_VERSION } = require('./helpers');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const banner =
`/**
 * vue-ngx-datatable v${APP_VERSION} (https://github.com/begemode/vue-ngx-datatable)
 * Copyright 2018
 * Licensed under MIT
 */`;

module.exports = function(env) {
  return merge(commonConfig({ env: ENV }), {
    devtool: 'source-map',
    mode: 'development',
    module: {
      exprContextCritical: false,
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          },
          exclude: [/\.(spec|e2e|d)\.ts$/]
        },
      ]
    },
    entry: {
      'index': './src/components/datatable.component.vue'
    },
    output: {
      path: dir('release'),
      libraryTarget: 'umd',
      library: 'vueNgxDatatable',
      umdNamedDefine: true
    },
    externals: {
      'vue': 'vue/dist/vue.esm.js',
      'Vue': 'vue/dist/vue.esm.js',
      'vue-property-decorator': 'vue-property-decorator',
      'vue-class-component': 'vue-class-component',
      'vue-router': 'vue-router',
      // 'vue-style-loader': 'vue-style-loader/index.js',
      // 'vue-loader': 'vue-loader/lib/index.js',
      // 'css-loader': 'css-loader/dist/index.js',
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
