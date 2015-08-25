import React from 'react';
import Rx from 'rx-lite';
import FILTER_BY from '../constants/IntentTypes';
let initialFilter = { intent: 'FILTER_BY', payload: FILTER_BY.ALL }
let TodoFilterIntent = new Rx.BehaviorSubject(initialFilter);

let css = { padding: '0 20px 0 0 ', textTransform : 'capitalize'};
let css1 = { padding: '0 20px 0 0 ', textTransform : 'capitalize'};
let css2 = { padding: '0 20px 0 0 ', textTransform : 'capitalize'};

const TodoFilters = React.createClass({

  statics : {
    getIntent : function () {
      return TodoFilterIntent;
    }
  },

  render : function () {
    return (
      <div>
        <a style={css} onClick={this.toggleAll.bind(this, FILTER_BY.ALL)}>All</a>
        <a style={css1} onClick={this.toggleAll.bind(this, FILTER_BY.DO)}>To Do</a>
        <a style={css2} onClick={this.toggleAll.bind(this, FILTER_BY.DID)}>Did</a>
      </div>
    )
  },

  toggleAll : function(filterBy){
    TodoFilterIntent.onNext({ intent: 'FILTER_BY', payload: filterBy });
  }

});

module.exports = TodoFilters;
