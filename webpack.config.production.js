var webpack = require('webpack');

module.exports = {
  entry: [
    './lib/index'
  ],
  output : {
    path      : __dirname + '/lib/dist/bundle/',
    filename  : 'bundle.js'
  },
  plugins : [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // Because uglify reports so many irrelevant warnings.
        warnings: false
      },
      minimize: true
    })

  ],
  resolve: {
    extensions : ['', '.js']
  },
  module: {
    loaders : [
      {
        test: /\.css$/, // Only .css files
        loader: 'style!css' // Run both loaders
      },
      {
        test: /\.js?$/,
        loaders: ['jsx-loader?harmony', 'babel?optional[]=runtime&stage=1'],
        exclude: /node_modules/
      }
    ]
  }
};
