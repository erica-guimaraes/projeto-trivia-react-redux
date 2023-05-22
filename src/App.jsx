import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import Login from './pages/Login';
import Trivia from './pages/Trivia';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact to="/" component={ Login } />
        <Route to="/trivia" component={ Trivia } />
      </Switch>
    );
  }
}

export default App;
