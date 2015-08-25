var Rx = require('Rx');
var Action = require('../constants/IntentTypes');
var TodoIntents = require('../intents/TodoIntents');
var assign = require('../utils/assign');
var TodoFilters = require('../shared/TodoFilters');

const TodoFilterIntents = TodoFilters.getIntent();
const FILTER_BY = {};
FILTER_BY[Action.ALL] = function (param) { return typeof param === 'boolean'; };
FILTER_BY[Action.DO] = function (param) { return param === false };
FILTER_BY[Action.DID] = function (param) { return param === true };


var initialTodos = [{ id: 10, text: 'firsts todo', complete: false}];
var id = (initialTodos.length === 0) ? 0 : initialTodos[initialTodos.length - 1].id;
var todoTicker = new Rx.BehaviorSubject(initialTodos);

// add as Subject
// TodoIntents.subscribe(todoInserts.s);
var _todos = todoTicker.
scan(function (list, operation) {
  var result =  operation(list);
  return result;
});

var sg = Rx.Observable.combineLatest(_todos, TodoFilterIntents, function (todos, filterBy) {
  // console.log('todos', todos, 'filterBy', filterBy);
  return todos.filter(function (todo) {
    // console.log('filter using', filterBy.payload, todo);
    // console.log('filtering', FILTER_BY[filterBy.payload], todo);
    return FILTER_BY[filterBy.payload](todo.complete);
  });
});
// .subscribe(function (argument) {
//   console.log('sg', argument);
// })



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

module.exports = sg;
