import React from 'react';
import { render } from 'react-dom';
import * as apps from './apps';
import { Pure } from './apps';

export type AppType = keyof typeof apps;
export const App = () => {
  const [, ls] = window.location.search.split('?');
  if (!ls) {
    return <Pure />;
  }
  const [, appType] = ls.split('=');
  if (!appType) {
    return <Pure />;
  }
  return <>{apps[appType]()}</>;
};

render(<App />, document.getElementById('root'));
