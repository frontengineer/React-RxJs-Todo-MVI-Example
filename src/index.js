import React from 'react';
import Router from 'react-router';
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

import routes from './shared/routes';
// import tree from '../store/tree';
var storeData = require('./store/TodoStore');

// import Baobab from 'Baobab';
//
var store = window.store || storeData;
// var store = new Baobab(window.store, {
//   shiftReferences: true
// });

var actions = require('./intents/TodoIntents');

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  // console.log('store', store, 'state', state)
  React.render(<Handler store={store} state={state} />, document.getElementById('app'));
});
