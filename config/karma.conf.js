// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const testWebpackConfig = require('./webpack.test');
process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'webpack'],
    plugins: [
      'karma-jasmine',
      'karma-jasmine-html-reporter',
      'karma-webpack',
      'karma-coverage',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-coverage-istanbul-reporter',
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml', 'coverage'],
    files: [
      { pattern: './config/spec-bundle.js', watched: false }
    ],
    webpack: testWebpackConfig({ env: 'test' }),
    webpackMiddleware: {
      stats: 'normal',
      logLevel: 'trace',
    },
    preprocessors: {
      './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap']
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
