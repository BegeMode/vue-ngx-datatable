const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ENV, IS_PRODUCTION, APP_VERSION, IS_DEV, dir } = require('./helpers');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const extractSass = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: "[id].css",
  // disable: process.env.NODE_ENV === 'development'
});

module.exports = function(options = {}) {
  return {
    context: dir(),
    resolve: {
      extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
      modules: [
        'node_modules',
        dir('src'),
        dir('demo')
      ],
      alias: {
        'vue$': 'vue/dist/vue.esm.js', // helpers.isProd()? 'vue/dist/vue.min.js' : 'vue/dist/vue.esm.js',
      },
    },
    performance: {
      hints: false
    },
    output: {
      path: dir('dist'),
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js'
    },
    resolveLoader: {
      alias: {
        'vue-loader': require.resolve('../node_modules/vue-loader/lib')
      }
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    module: {
      exprContextCritical: false,
      rules: [
        {
          test: /\.(png|woff|woff2|eot|ttf|svg|jpeg|jpg|gif)$/,
          loader: 'url-loader',
          query: {
            limit: '100000'
          }
        },
        {
          test: /\.html$/,
          loader: path.resolve('config/my-vue-raw-loader.js'),
        },
        {
          test: /\.(css|sass|scss)$/,
          oneOf: [
            // this matches <style module>
            {
              resourceQuery: /module/,
              use: [
                'vue-style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    localIdentName: '[local]_[hash:base64:5]',
                    url: false, // очень важная опция - перезаписывает пути в css url на относительные (с начальным слэшем)
                  }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    // you can also read from a file, e.g. `variables.scss`
                    //data: `$color: red;`
                  }
                }
              ]
            },
            {
              use: [
                'vue-style-loader',
                'css-loader',
                {
                  loader: 'sass-loader',
                  options: {
                    // you can also read from a file, e.g. `variables.scss`
                    //data: `$color: red;`
                  }
                }
              ],
            },  
          ],  
        },
        // {
        //   test: /\.css/,
        //   use: [
        //     MiniCssExtractPlugin.loader,
        //     {
        //       loader: 'css-loader'
        //     },
        //     { loader: 'to-string-loader' }, 
        //     { loader: 'css-loader' },
        //     { loader: 'postcss-loader' }
        //   ]
        // },
        // {
        //   test: /\.scss$/,
        //   use: [
        //     MiniCssExtractPlugin.loader,
        //     { loader: 'css-loader' },
        //     { loader: 'to-string-loader' }, 
        //     { loader: 'css-loader' },
        //     { loader: 'postcss-loader' },
        //     { 
        //       loader: 'sass-loader',
        //       options: {
        //         sourceMap: true
        //       }
        //     }
        //   ]
        // }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      }
    },
    plugins: [
      // new ExtractTextPlugin('[name].css'),
      // new webpack.NamedModulesPlugin(),
      extractSass,
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        ENV,
        IS_PRODUCTION,
        APP_VERSION,
        IS_DEV,
        HMR: options.HMR
      }),
      new CopyWebpackPlugin([
        { from: 'assets', to: 'assets' }
      ]),
      new webpack.LoaderOptionsPlugin({
        options: {
          context: dir(),
          tslint: {
            emitErrors: false,
            failOnHint: false,
            resourcePath: 'src'
          },
          postcss: function() {
            return [ autoprefixer ];
          }
        }
      })
    ]
  };

};
