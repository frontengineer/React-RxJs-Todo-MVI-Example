var webpack = require('webpack');

module.exports = function(config){
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
    'tests.webpack.js',
    ],
    preprocessors: {
      'tests.webpack.js' : ['webpack', 'sourcemap']
    },
    reporters : ['dots'],
    webpack : {
      // devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders : [
          { test: /\.js?$/, exclude: '/node_modules/', loader: 'babel-loader' }
        ]
      },
      watch: true
    },
    webPackServer : {
      noInfo: true
    }
  });
};
