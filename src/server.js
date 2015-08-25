"use strict";
require("babel/register");
require('node-jsx').install({ extension: '.js', harmony: true });

var express = require('express');
var exphbs  = require('express-handlebars');
var React   = require('react');
var Router  = require('react-router');
var app = express();
var bundlePath = (process.env.NODE_ENV === 'production') ? 'dist/bundle/bundle.js' : 'http://localhost:8080/bundle/bundle.js';
var port = process.env.PORT || 3000;
var store = require('./store/state');
//set hb
var helpers = {
    json : function(payload){
      return JSON.stringify(payload);
    }
};

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/dist/bundle', express.static(__dirname + '/dist/bundle'));

var routes = require('./shared/routes');

app.use(function(req, res){
  Router.run(routes, req.path, function(Handler, state){
    var content = React.renderToString(React.createElement(Handler, { state: state, store: store }));
    // var content = React.renderToString(WrapComponent({ state: state, store: store }));
    res.render('index', { content: content, bundlePath : bundlePath, store: store, helpers: helpers });
  });
});

var server = app.listen(port, function(){
  console.log('running mode: ' + process.env.NODE_ENV);
  console.log('Example app listening at http://localhost:', port);
});
