import Rx from 'rx-lite';
import Header from '../shared/Header';
import TodoList from '../shared/TodoList';
import Footer from '../shared/Footer';
import Action from '../constants/IntentTypes';

const HeaderIntent = Header.getIntent();
const TodoListIntent = TodoList.getIntent();
const FooterIntent = Footer.getIntent();

const createTodo = HeaderIntent.
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
