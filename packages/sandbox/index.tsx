import { themeColors } from '@aexol-studio/styling-system';
import styled from '@emotion/styled';
import { vars } from 'graphql-editor';
import { fontFamilySans } from 'graphql-editor/lib/vars';
import React from 'react';
import { createRoot } from 'react-dom/client';
import * as apps from './apps';

const MainTheme = themeColors('graphqleditor', 'dark');

export type AppType = keyof typeof apps;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  background: ${MainTheme.background.default};
  color: ${MainTheme.text.default};
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
  background-color: ${MainTheme.neutral[500]};
  cursor: pointer;
  margin: 10px;
  text-decoration: none;
  color: ${MainTheme.text.default};
  border: 1px solid transparent;
  transition: ${vars.transition};
  :hover {
    border: 1px solid ${MainTheme.accents[200]};
    color: ${MainTheme.accents[200]};
    background-color: ${MainTheme.neutral[600]};
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
const rootDiv = document.getElementById('root');
const root = createRoot(rootDiv);
root.render(<App />);
