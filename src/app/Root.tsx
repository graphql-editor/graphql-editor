import * as React from 'react';
import App from './App';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
class Root extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route component={App} exact path="/" />
        </Switch>
      </Router>
    );
  }
}
export default Root;
