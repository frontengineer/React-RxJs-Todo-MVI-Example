var webpack = require('webpack');

module.exports = {
  entry: [
    './src/client/entry'
  ],
  output : {
    path      : __dirname + '/dist/bundle/',
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
        test: /\.js?$/,
        loaders: ['react-hot', 'jsx-loader?harmony', 'babel-loader'],
        exclude: /node_modules/
      }
    ]
  }
};
