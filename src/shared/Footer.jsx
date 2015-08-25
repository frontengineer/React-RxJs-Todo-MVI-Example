import React, {Component} from 'react';
import Rx from 'Rx';
import IntentConstants from '../constants/IntentTypes';

let Intent = new Rx.Subject();

let Footer = React.createClass({
  statics : {
    getIntent : function () {
      return Intent;
    }
  },

  render: function(){
    var list = this.props.todoData.filter(function (todo) {
      return todo.complete === true;
    });
    var html = (list.length) ? (<div>{list.length} <a href="javascript:void(0)" onClick={this.removeBatch.bind(this, list)}>remove completed</a></div>) : null;

    return (
      <div>
        {html}
      </div>
    )
  },

  removeBatch : function (batch) {
    var batch = batch.map(function (todo) {
      return todo.id;
    }).forEach(function (todoID) {
      Intent.onNext({ intent: IntentConstants.DELETE_TODO, payload: todoID})
    });
  }
});

module.exports = Footer;
