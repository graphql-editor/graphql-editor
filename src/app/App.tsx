import * as React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import Home from './Home';
import { Cloud } from '../cloud/Container';
import { OverlayMenu } from '../cloud/Components/OverlayMenu';
class AppContainer extends React.Component<RouteComponentProps<any>> {
  componentDidMount() {
    Cloud.setToken();
  }
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route component={Home} exact path="/" />
        </Switch>
        <OverlayMenu />
      </React.Fragment>
    );
  }
}
export default AppContainer;
