var  Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var React  = require('react');

var TodoApp = require('./TodoApp');
module.exports = (
  <Route handler={TodoApp} path="/">
    <DefaultRoute name="App" />
    <Route name="TodoApp" handler={TodoApp} />
  </Route>
);
