import React from 'react';
import Router from 'react-router';
const Route = Router.Route;
const Link = Router.Link;
const RouteHandler = Router.RouteHandler;

let AppHandler = React.createClass({
  childContextTypes: {
    actions : React.PropTypes.object,
    store   : React.PropTypes.object
  },

  getChildContext : function(){
    return {
      actions : this.props.actions,
      store   : this.props.store
    }
  },

  render: function() {
    // var isActive = this.isActive(this.props.to, this.props.params, this.props.query);
    return (
      <div>
      <h1>Main Apps</h1>
        <Link to="About" className="joe">About</Link>
        <Link to="TodoApp">Todos</Link>
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = AppHandler;
