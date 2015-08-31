import React from 'react';
import Router, {Route, Link, RouteHandler} from 'react-router';
import routes from './shared/routes';
import './styles/todoApp.css';

// import todo data';
let storeData = require('./store/TodoStore');
let store = window.store || storeData;

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  React.render(<Handler store={store} state={state} />, document.getElementById('app'));
});
