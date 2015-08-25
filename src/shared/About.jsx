import React from 'react';
// import {branch} from 'baobab-react/mixins';
var ContextMixin = require('./ContextMixin');


let About = React.createClass({
  // mixins: [ContextMixin],
  getInitialState : function () {
    return {
      title : ''
    }
  },

  // cursors : {
  //   names: ['names']
  // },
  componentDidMount : function(){
    // console.log('mounted about with', this);
  },

  render: function() {
    // console.log('about state', this.state.names);
    return (
      <div>About
        <button onClick={this.addName}>Add larry</button>
          <ul>
            {this.state.names.map(this.renderNames)}
          </ul>
      </div>
    );
  },

  renderNames : function(name, index) {
    return (<li key={index}>{name}</li>)
  },

  addName : function (name) {
    this.actions.addName('larry');
  }
});
export default About;
