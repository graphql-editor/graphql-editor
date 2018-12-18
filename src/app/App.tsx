import * as React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import Home from './Home';
import { Cloud } from '../cloud/Container';
import { Provider } from 'unstated';
class AppContainer extends React.Component<RouteComponentProps<any>> {
  componentDidMount() {
    Cloud.setToken();
  }
  render() {
    return (
      <Provider inject={[Cloud]}>
        <Switch>
          <Route component={Home} exact path="/" />
        </Switch>
      </Provider>
    );
  }
}
export default AppContainer;
