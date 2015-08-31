import React, { Component } from 'react';
import Header from './Header';
import TodoList from './TodoList';
import TodoCount from './TodoCount';
import Footer from './Footer';
import TodoStore from '../store/TodoStore';
import ReactRenderVisualizer from 'react-render-visualizer';

const TodoApp = React.createClass({
  // mixins: [ReactRenderVisualizer],
  getInitialState : function (argument) {
    return { todoData: []}
  },

  componentDidMount : function () {
    let self = this;
    TodoStore.
    subscribe(function(data){
      self.setState({ todoData: data });
    });
  },

  render: function() {
    return (
      <section className="todoapp">
        <Header options={{ id: 'todoInput', placeholder: 'Enter Todo', className: 'new-todo'}} />
        <TodoList todoData={this.state.todoData}/>
        <Footer todoData={this.state.todoData} filterChannel={TodoStore.StoreFilterChannel} />
      </section>
    );
  }
});

module.exports = TodoApp;
