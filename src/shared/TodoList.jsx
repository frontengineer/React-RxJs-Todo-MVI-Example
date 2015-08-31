import React, {Component} from 'react';
import TodoItem from './TodoItem';
import Rx from 'rx-lite';
import IntentConstants from '../constants/IntentTypes';
import Footer from './Footer';

let TodoListIntent = new Rx.Subject();
let rowStyle = {position:'relative'};

const TodoList = React.createClass({

  statics : {
    getIntent : function () {
      return TodoListIntent;
    }
  },

  getInitialState : function (argument) {
    let self = this;
    return {
      inputId: undefined,
      inputText: undefined,
      watchTodos : TodoItem.getIntent().subscribe(function (payload) {
        TodoListIntent.onNext({ intent: IntentConstants.EDIT_TODO, payload: payload})
        self.setState({ inputId: undefined, inputText: undefined});
      }),
      removeBatch : []
    }
  },

  render: function(){
    let self = this;
    let isMarkedCSS = {'text-decoration' : 'line-through'};
    let list = this.props.todoData.map(function(todo) {
      return (
        <li
          style={rowStyle}
          onDoubleClick={self.editTodo.bind(self, todo)}
          key={todo.id}>
          <input type="checkbox" onChange={self.toggleTodo.bind(self, todo)} checked={(todo.complete !== true) ? null : 'checked'} />
            {self.state.inputId === todo.id ?
              <TodoItem id='editableTodo' todo={todo} /> :
                <span style={todo.complete ? isMarkedCSS : {}}>{todo.text}</span>}
          <button onClick={self.removeTodo.bind(self, todo.id)}>x</button>
        </li>
      )
    });

    return (
      <section className="main">
        <input className="toggle-all" type="checkbox" onChange={self.toggleAll}/>
        <ul className="todo-list">
          {list}
        </ul>
      </section>
    )
  },

  removeTodo : function(elementKey){
    TodoListIntent.onNext({ intent: IntentConstants.DELETE_TODO, payload: elementKey});
  },

  editTodo : function(todo){
    this.setState({ inputId: todo.id, inputText: todo.text });
  },

  toggleTodo : function(elementKey){
    TodoListIntent.onNext({ intent: IntentConstants.MARK_TODO, payload: elementKey.id});
  },

  toggleAll : function(elementKey){
    TodoListIntent.onNext({ intent: IntentConstants.MARK_ALL, payload: elementKey.target.checked});
  }
});

module.exports = TodoList;
