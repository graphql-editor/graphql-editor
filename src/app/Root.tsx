import * as React from 'react';
import App from './App';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Analytics } from '../cloud/analytics';
class Root extends React.Component {
  componentWillMount(){
    Analytics.init()
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route component={App}  path="/:namespace?/:project?/" />
        </Switch>
      </Router>
    );
  }
}
export default Root;
