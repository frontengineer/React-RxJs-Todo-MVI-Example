var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/client/entry'
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
    extensions : ['', '.js']
  },
  module: {
    loaders : [
      {
        test: /\.js?$/,
        loaders: ['react-hot', 'jsx-loader?harmony', 'babel-loader'],
        exclude: /node_modules/
      }
    ]
  }
};
