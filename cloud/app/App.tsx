import * as React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { Cloud } from '../cloud/Container';
import { Provider } from 'unstated';
import * as ReactGA from 'react-ga';
import { Home } from './Home';
class AppContainer extends React.Component<
  RouteComponentProps<{
    project?: string;
    namespace?: string;
  }>
> {
  componentDidMount() {
    const { namespace, project } = this.props.match.params;
    Cloud.setState({
      pushHistory: this.props.history.push,
      location: this.props.location
    });
    if (namespace && project) {
      Cloud.setState({
        projectEndpoint: `${namespace}/${project}`
      });
    }
    Cloud.setToken().then(() => {
      if (namespace && project) {
      }
    });
  }
  componentDidUpdate(
    prevProps: RouteComponentProps<{
      project?: string;
      namespace?: string;
    }>
  ) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      ReactGA.pageview(this.props.location.pathname);
    }
  }
  render() {
    return (
      <Provider inject={[Cloud]}>
        <Switch>
          <Route component={Home} path="/" />
        </Switch>
      </Provider>
    );
  }
}
export default AppContainer;
