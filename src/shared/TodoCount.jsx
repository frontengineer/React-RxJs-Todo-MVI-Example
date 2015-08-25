import React from 'react';
import Rx from 'rx-lite';

let css = { padding: '0 0 0 20px'};

const TodoCount = React.createClass({
  render : function () {
    return (
      <span style={css} >
        {this.props.count} To Do
      </span>
    )
  }
});

module.exports = TodoCount;
