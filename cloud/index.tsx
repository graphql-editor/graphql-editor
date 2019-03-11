/* eslint-disable import/default */
import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app/Root';
import { cssRaw } from 'typestyle';
cssRaw(`

@font-face {
  font-family: "untitled-font-1";
  src:url("${require('./assets/icon-font/fonts/untitled-font-1.eot')}");
  src:url("${require('./assets/icon-font/fonts/untitled-font-1.eot?#iefix')}") format("embedded-opentype"),
    url("${require('./assets/icon-font/fonts/untitled-font-1.woff')}") format("woff"),
    url("${require('./assets/icon-font/fonts/untitled-font-1.ttf')}") format("truetype"),
    url("${require('./assets/icon-font/fonts/untitled-font-1.svg')}") format("svg");
  font-weight: normal;
  font-style: normal;
}
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
  module.hot.accept('./app/Root', () => {
    const NewRoot = require('./app/Root').default;
    renderFunc(NewRoot);
  });
}
