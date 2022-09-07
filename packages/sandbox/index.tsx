import React from 'react';
import { render } from 'react-dom';
import * as apps from './apps';
import { Pure } from './apps';

export type AppType = keyof typeof apps;
export const App = () => {
  const s = new URLSearchParams(window.location.search);
  const p = s.get('a');
  if (!p) {
    return <Pure />;
  }
  return <>{apps[p]()}</>;
};

render(<App />, document.getElementById('root'));
