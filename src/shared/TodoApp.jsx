import React, { Component } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoFilters from './TodoFilters';
import TodoCount from './TodoCount';
import Footer from './Footer';
import TodoStore from '../store/TodoStore';
import ReactRenderVisualizer from 'react-render-visualizer';
// var ContextMixin = require('./ContextMixin');
// function mystuff(target){
//   target.power = 'flight'
// }
const TodoApp = React.createClass({
  // mixins: [ReactRenderVisualizer],
  getInitialState : function (argument) {
    return { todoData: [] }
  },

  componentDidMount : function () {
    var self = this;
    TodoStore.
    subscribe(function(data){
      self.setState({ todoData: data });
    });
  },

  render: function() {
    // console.log('about stater', this);
    return (
      <div>
        Todos
        <TodoCount count={this.state.todoData ? this.state.todoData.length : 0}/>
        <TodoInput options={{ id: 'todoInput', placeholder: 'Enter Todo'}} />
        <TodoFilters />
        <TodoList todoData={this.state.todoData}/>
        <Footer todoData={this.state.todoData}/>
      </div>
    );
  },

  renderNames: function(name, index) {
    return (<li key={index}>{name}</li>)
  },

  addName: function(name) {
    this.actions.addName('larry');
  }
});

// console.log('any power', TodoApp.power);
module.exports = TodoApp;
