import * as React from 'react';
import { Home } from './Home';
import { Cloud } from '../Container';
import { Provider } from 'unstated';
class AppContainer extends React.Component {
  render() {
    return (
      <Provider inject={[Cloud]}>
        <Home />
      </Provider>
    );
  }
}
export default AppContainer;
