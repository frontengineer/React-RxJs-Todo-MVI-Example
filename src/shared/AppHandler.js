var React = require('react');
var  Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var AppHandler = React.createClass({
  render: function() {
    return (
      <div>
      <h1>Main App</h1>
        <Link to="About" activeClassName="current">About</Link>
        <RouteHandler/>
      </div>
    );
  }
});
module.exports = AppHandler;
