import React, {Component} from 'react';
import Rx from 'Rx';
import ReactRenderVisualizer from 'react-render-visualizer';

let TodoInputIntent = new Rx.Subject();

const Header = React.createClass({
  statics : {
    getIntent : function () {
      return TodoInputIntent;
    }
  },

  // mixins: [ReactRenderVisualizer],

  getInitialState : function (argument) {
    return { }
  },

  componentDidMount : function () {
    new Rx.Observable.fromEvent(document.getElementById(this.props.options.id), 'keyup').
    filter(function (todoInput) {
      return (todoInput.target.value !='') && (todoInput.keyCode === 13);
    }).
    subscribe(function (todoInput) {
      TodoInputIntent.onNext(todoInput.target.value.trim());
      todoInput.target.value = '';
    });
  },

  render: function(){
    let fieldOptions = this.props.options;
    fieldOptions.type = 'text';
    return (
      <header className="header">
        <h1>Todos</h1>
          {React.createElement('input', fieldOptions)}
      </header>
    )
  }
});

module.exports = Header;
