import React from 'react';
import Rx from 'rx-lite';

const TodoCount = React.createClass({
  render : function () {
    return (
      <span className="todo-count" >
        {this.props.count ? this.props.count + ' To Do' : null}
      </span>
    )
  }
});

module.exports = TodoCount;
