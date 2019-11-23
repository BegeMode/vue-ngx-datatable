const testWebpackConfig = require('./webpack.test');
process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function (config) {
  config.set({
    basePath: '..',
    singleRun: false,
    frameworks: ['jasmine'],
    files: [
      { pattern: './config/spec-bundle.js', watched: false }
    ],
    preprocessors: {
      './config/spec-bundle.js': ['webpack', 'coverage', 'sourcemap']
    },
    webpack: testWebpackConfig({ env: 'test' }),
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome_with_debugging'],
    customLaunchers: {
      Chrome_with_debugging: {
        base: 'Chrome',
        flags: ['--remote-debugging-port=9222'],
        debug: true
      }
    },
    mime: {
      'text/x-typescript': ['ts']
    },
  })
}
