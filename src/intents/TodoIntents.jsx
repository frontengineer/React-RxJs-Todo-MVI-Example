import Rx from 'rx-lite';
import TodoInput from '../shared/TodoInput';
import TodoList from '../shared/TodoList';
import Footer from '../shared/Footer';
import Action from '../constants/IntentTypes';
import TodoFilters from '../shared/TodoFilters';

const TodoInputIntent = TodoInput.getIntent();
const TodoListIntent = TodoList.getIntent();
const FooterIntent = Footer.getIntent();

const createTodo = TodoInputIntent.
  map(function (text) {
    return { intent: Action.CREATE_TODO, payload: text }
  });

const deleteTodo = TodoListIntent.
  filter(function(action){
    return action.intent === Action.DELETE_TODO
  });

const editTodo = TodoListIntent.
  filter(function(action){
  return action.intent === Action.EDIT_TODO
}).map(function (action) {
  return action
});

const markTodo = TodoListIntent.
  filter(function(action){
  return action.intent === Action.MARK_TODO
  });

const markAll = TodoListIntent.
  filter(function(action){
  return action.intent === Action.MARK_ALL
  });


const removeBatch = FooterIntent.
  filter(function(action){
  return action.intent === Action.DELETE_TODO
  });

module.exports = Rx.Observable.merge(createTodo,
  deleteTodo, editTodo, markTodo, markAll, removeBatch);
