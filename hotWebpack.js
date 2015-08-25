var path = require('path');
var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config.'+ process.env.NODE_ENV);

var port = 8080;

var options = {
  publicPath: config.output.publicPath
};

if(process.env.NODE_ENV === 'development'){
  // options.contentBase = __dirname + '/src/views';
  options.hot     = true;
  options.stats   = { colors: true };
  options.headers = { 'Access-Control-Allow-Origin': '*' };
  options.historyApiFallback = true;
}


var server = new WebpackDevServer(webpack(config), options);
console.log('webpack run config for: ' + process.env.NODE_ENV);
server.listen(port, 'localhost', function(err){
  if (err) {
    console.log(err);
  }
  console.log(__dirname + '/views');
  console.log('Hot load server listening at localhost:' + port);

});
