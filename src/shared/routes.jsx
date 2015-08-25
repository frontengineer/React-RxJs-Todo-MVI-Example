var  Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var React  = require('react');

var AppHandler  = require('./AppHandler');
var IsLoggedIn = require('./IsLoggedIn');
var About = require('./About');
var TodoApp = require('./TodoApp');
module.exports = (
  <Route handler={AppHandler} path="/">
    <DefaultRoute name="App" />
    <Route name="About" handler={About} />
    <Route name="TodoApp" handler={TodoApp} />
  </Route>
);
