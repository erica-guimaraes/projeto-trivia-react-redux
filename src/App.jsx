import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact to="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
