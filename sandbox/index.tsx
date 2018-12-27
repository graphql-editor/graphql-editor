/* eslint-disable import/default */
import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app/App';

import { cssRaw } from 'typestyle';
cssRaw(`
body{
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
`);

const renderFunc = (Component: React.ComponentType<any>) =>
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );

renderFunc(App);

if (module.hot) {
  module.hot.accept('./app/App', () => {
    const NewRoot = require('./app/App').default;
    renderFunc(NewRoot);
  });
}
