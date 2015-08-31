var Rx = require('Rx');
var Action = require('../constants/IntentTypes');
var TodoIntents = require('../intents/TodoIntents');
var assign = require('../utils/assign');
var TodoFilters = require('../shared/TodoFilters');
var StoreFilterChannel = new Rx.BehaviorSubject(Action.ALL);

const TodoFilterIntents = TodoFilters.getIntent();
const FILTER_BY = {};
FILTER_BY[Action.ALL] = function (param) { return typeof param === 'boolean'; };
FILTER_BY[Action.DO] = function (param) { return param === false };
FILTER_BY[Action.DID] = function (param) { return param === true };


var initialTodos = [{ id: 10, text: 'firsts todo', complete: false}];
var id = (initialTodos.length === 0) ? 0 : initialTodos[initialTodos.length - 1].id;
var todoTicker = new Rx.BehaviorSubject(initialTodos);

// add as Subject
var unfilteredTodos = todoTicker.
scan(function (list, operation) {
  var result =  operation(list);
  return result;
});

var _todos = Rx.Observable.combineLatest(unfilteredTodos, TodoFilterIntents, function (todos, filterBy) {
  return todos.filter(function (todo) {
    StoreFilterChannel.onNext(filterBy.payload);
    return FILTER_BY[filterBy.payload](todo.complete);
  });
});

var createTodo = TodoIntents.filter(function (action) {
  return action.intent === Action.CREATE_TODO;
}).map(function (action) {
  return function(todos){
    // TODO: make less generic
    id = (1+id);
    return [{
      id        : id,
      text      : action.payload,
      complete : false
    }].concat(todos);
  }
});

var deleteTodo = TodoIntents.filter(function (action) {
  return action.intent === Action.DELETE_TODO;
}).map(function (action) {
  return function(todos){
    return todos.filter(function(todo){
      return todo.id !== action.payload
    });
  }
});

var editTodo = TodoIntents.filter(function (action) {
  return action.intent === Action.EDIT_TODO;
}).map(function (action) {
  return function(todos){
    return todos.map(function (todo) {
      return (todo.id !== action.payload.id) ? todo : assign({}, todo, { text: action.payload.text }) ;
    });
  }
});

var markTodo = TodoIntents.filter(function (action) {
  return action.intent === Action.MARK_TODO;
}).map(function (action) {
  return function(todos){
    return todos.map(function (todo) {
      return (todo.id !== action.payload) ? todo : assign({}, todo, { complete: !todo.complete }) ;
    });
  }
});

var markAll = TodoIntents.filter(function (action) {
  return action.intent === Action.MARK_ALL;
}).map(function (action) {
  return function(todos){
    return todos.map(function(todo){
      return assign({}, todo, { complete: action.payload });
    });
  }
});

// subscribe as group on todoTicker
Rx.Observable.
  merge(createTodo, deleteTodo, editTodo, markTodo, markAll).
  subscribe(todoTicker);

// quick hack to pass active filter button state for render
_todos.StoreFilterChannel = StoreFilterChannel;

module.exports = _todos;
