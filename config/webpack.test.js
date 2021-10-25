const commonConfig = require('./webpack.common');

module.exports = function (env) {
  const config = { ...commonConfig(env), ...{ mode: 'development', devtool: 'inline-source-map' } };
  config.node = {
    global: true,
  };
  config.module.rules.push(
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
  );
  return config;
};
