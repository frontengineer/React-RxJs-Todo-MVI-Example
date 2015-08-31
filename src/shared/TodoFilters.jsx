import React from 'react';
import Rx from 'rx-lite';
import FILTER_BY from '../constants/IntentTypes';
let initialFilter = { intent: 'FILTER_BY', payload: FILTER_BY.ALL }
let TodoFilterIntent = new Rx.BehaviorSubject(initialFilter);

let css = { padding: '3px 8px 0 0 ', border : 'solid 1px #dddddd', marginRight: 10};

const TodoFilters = React.createClass({

  statics : {
    getIntent : function () {
      return TodoFilterIntent;
    }
  },

  getInitialState : function () {
    return {
      activeButton : ''
    }
  },

  componentDidMount : function () {
    let self = this;
    this.props.filterChannel.subscribe(function (currentFilter) {
      self.setState({ activeButton : currentFilter});
    });
  },

  render : function () {
    return (
      <ul className="filters">
        <li><a onClick={this.toggleAll.bind(this, FILTER_BY.ALL)} className={ (this.state.activeButton === FILTER_BY.ALL) ? 'selected': ''}>All</a></li>
        <li><a onClick={this.toggleAll.bind(this, FILTER_BY.DO)} className={ (this.state.activeButton === FILTER_BY.DO) ? 'selected': ''}>To Do</a></li>
        <li><a onClick={this.toggleAll.bind(this, FILTER_BY.DID)} className={ (this.state.activeButton === FILTER_BY.DID) ? 'selected': ''}>Did</a></li>
      </ul>
    )
  },

  toggleAll : function(filterBy){
    TodoFilterIntent.onNext({ intent: 'FILTER_BY', payload: filterBy });
  }

});

module.exports = TodoFilters;
