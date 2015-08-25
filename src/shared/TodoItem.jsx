import React, {Component} from 'react';
import Rx from 'rx-lite';
import ReactRenderVisualizer from 'react-render-visualizer';
// import TodoActions from '../actions/TodoActions'
// var ContextMixin = require('./ContextMixin');

let TodoInputIntent = new Rx.Subject();

let TodoInput = React.createClass({
  mixins: [ReactRenderVisualizer],

  statics : {
    getIntent : function () {
      return TodoInputIntent;
    }
  },

  getInitialState : function () {
    console.log('initial props', this.props);
    return {
      inputValue : this.props.todo.text
    }
  },
  // componentDidMount
  // mixins: [ContextMixin],

  // cursors : {
  //   todos: ['todos']
  // },


  componentDidMount : function () {
    var self = this;
    var source = new Rx.Observable.fromEvent(document.getElementById(this.props.id), 'keyup');

    var enters = source.
    filter(function (todoInput) {
      return (todoInput.target.value !='') && (todoInput.keyCode === 13);
    }).
    subscribe(function (todoInput) {
      TodoInputIntent.onNext({ id: self.props.todo.id, text: todoInput.target.value.trim() });
      todoInput.target.value = '';
      enters.dispose();
    });

  },

  render: function(){
    var fieldOptions = this.props.options;
    return (
      <input type="text"
        id={this.props.id}
        ref={this.props.id}
        value={this.state.inputValue}
        onChange={this.readEdit}
         />
    )

    return React.createElement('input', fieldOptions);
  },

  readEdit : function (editField) {
    this.setState({ inputValue: editField.target.value})
  }

});

module.exports = TodoInput;
