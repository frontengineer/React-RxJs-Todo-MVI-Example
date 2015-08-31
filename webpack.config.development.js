var webpack = require('webpack');
var path = require('path');


module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output : {
    path      : __dirname + '/bundle/',
    filename  : 'bundle.js',
    publicPath: 'http://localhost:8080/bundle/'
  },
  plugins : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions : ['', '.js', '.jsx']
  },
  module: {
    loaders : [
      {
        test: /\.css$/, // Only .css files
        loader: 'style!css' // Run both loaders
      },
      {
        test: /\.js?$/,
        loaders: ['react-hot', 'babel?optional[]=runtime&stage=1'],
        exclude: /node_modules|bower_components/
      },
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel?optional[]=runtime&stage=1'],
        exclude: /node_modules|bower_components/
      },
      { test: /\.handlebars$/, loader: "handlebars-loader" }
    ]
  }
};
