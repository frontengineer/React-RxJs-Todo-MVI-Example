import React, {Component} from 'react';
import Rx from 'Rx';
import IntentConstants from '../constants/IntentTypes';
import TodoFilters from './TodoFilters';
import TodoCount from './TodoCount';

let Intent = new Rx.Subject();

const Footer = React.createClass({
  statics : {
    getIntent : function () {
      return Intent;
    }
  },

  render: function(){
    let list = this.props.todoData.filter(function (todo) {
      return todo.complete === true;
    });
    let itemsRemaining = this.props.todoData.filter(function (todo) {
      return todo.complete === false;
    });

    return (
      <footer className="footer">
        <TodoCount count={itemsRemaining.length || 0}/>
        <TodoFilters filterChannel={this.props.filterChannel} />
        {list.length ? <button className="clear-completed" onClick={this.removeBatch.bind(this, list)}>Remove Completed</button> : null}
      </footer>
    )
  },

  removeBatch : function (batch) {
    let batch = batch.map(function (todo) {
      return todo.id;
    });
    batch.forEach(function (todoID) {
      Intent.onNext({ intent: IntentConstants.DELETE_TODO, payload: todoID})
    });
  }
});

module.exports = Footer;
