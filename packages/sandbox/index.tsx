import styled from '@emotion/styled';
import { MainTheme, vars } from 'graphql-editor';
import { fontFamilySans } from 'graphql-editor/lib/vars';
import React from 'react';
import { render } from 'react-dom';
import * as apps from './apps';

export type AppType = keyof typeof apps;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  background-color: ${MainTheme.background.mainFurther};
  color: ${MainTheme.text};
  padding: 40px;
  font-family: ${fontFamilySans};
`;
const Main = styled.div`
  display: flex;
  flex-flow: row wrap;
`;
const Tile = styled.a`
  border-radius: 10px;
  padding: 40px;
  background-color: ${MainTheme.background.mainFar};
  cursor: pointer;
  margin: 10px;
  text-decoration: none;
  color: ${MainTheme.dimmed};
  transition: ${vars.transition};
  :hover {
    color: ${MainTheme.active};
    background-color: ${MainTheme.background.mainMiddle};
  }
`;

const Title = styled.div`
  margin: 10px;
`;

export const AppList = () => {
  return (
    <Wrapper>
      <Title>
        <h2>Examples</h2>
        <p>Open one of the examples to see how certain features work</p>
      </Title>
      <Main>
        {Object.keys(apps).map((app) => (
          <Tile href={`/?a=${app}`}>
            <b>{app}</b>
            <p>{apps[app].description}</p>
          </Tile>
        ))}
      </Main>
    </Wrapper>
  );
};

export const App = () => {
  const s = new URLSearchParams(window.location.search);
  const p = s.get('a');
  if (!p) {
    return <AppList />;
  }
  return <>{apps[p]()}</>;
};

render(<App />, document.getElementById('root'));
