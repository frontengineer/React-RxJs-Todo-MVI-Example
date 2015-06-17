import React from 'react';
import Router from 'react-router';
import routes from '../shared/routes';


Router.run(routes, (Handler, state) => {
  React.render(<Handler state={state} />, document.getElementById('app'));
});
