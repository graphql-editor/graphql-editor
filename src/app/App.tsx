import * as React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import Home from './Home';
import { Cloud } from '../cloud/Container';
import * as qs from 'query-string';
class AppContainer extends React.Component<RouteComponentProps<any>> {
  componentDidMount() {
    const params: {
      token?: string;
    } = qs.parse(this.props.location.search);
    if (params.token) {
      Cloud.setToken(params.token);
    }
  }
  render() {
    return (
      <Switch>
        <Route component={Home} exact path="/" />
      </Switch>
    );
  }
}
export default AppContainer;
