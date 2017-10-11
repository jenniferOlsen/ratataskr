import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

render((
  <Router history={browserHistory}>
    <Route path="/">
      <IndexRoute />
    </Route>
  </Router>
), document.getElementById('root'));
