import { themeColors } from "@aexol-studio/styling-system";
import styled from "@emotion/styled";
import { vars } from "graphql-editor";
import React from "react";
import { createRoot } from "react-dom/client";
import * as apps from "./apps";
import { Global, css } from "@emotion/react";

const MainTheme = themeColors("graphqleditor", "dark");
const fontFamilySans = "Arial";

export type AppType = keyof typeof apps;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  background: ${MainTheme.neutrals.L6};
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
  background-color: ${MainTheme.neutrals.L5};
  cursor: pointer;
  margin: 10px;
  text-decoration: none;
  color: ${MainTheme.text.default};
  border: 1px solid transparent;
  transition: ${vars.transition};
  :hover {
    border: 1px solid ${MainTheme.accent.L2};
    color: ${MainTheme.accent.L2};
    background-color: ${MainTheme.neutrals.L6};
  }
`;

const Title = styled.div`
  margin: 10px;
`;
const GlobalStyles = () => (
  <>
    <Global
      styles={css`
        @font-face {
          font-family: "Fira Sans";
          src: url(${require("./assets/fira/woff2/FiraSans-Light.woff2")})
            format("woff2");
          src: url(${require("./assets/fira/woff/FiraSans-Light.woff")})
            format("woff");
          font-weight: 300;
          font-style: normal;
        }

        @font-face {
          font-family: "Fira Sans";
          src: url(${require("./assets/fira/woff2/FiraSans-Regular.woff2")})
            format("woff2");
          src: url(${require("./assets/fira/woff/FiraSans-Regular.woff")})
            format("woff");
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: "Fira Sans";
          src: url(${require("./assets/fira/woff2/FiraSans-Medium.woff2")})
            format("woff2");
          src: url(${require("./assets/fira/woff/FiraSans-Medium.woff")})
            format("woff");
          font-weight: 500;
          font-style: normal;
        }

        @font-face {
          font-family: "Fira Sans";
          src: url(${require("./assets/fira/woff2/FiraSans-Bold.woff2")})
            format("woff2");
          src: url(${require("./assets/fira/woff/FiraSans-Bold.woff")})
            format("woff");
          font-weight: 700;
          font-style: normal;
        }
        @font-face {
          font-family: "Fira Mono";
          src: url(${require("./assets/fira/woff2/FiraMono-Regular.woff2")})
            format("woff2");
          src: url(${require("./assets/fira/woff/FiraMono-Regular.woff")})
            format("woff");
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: "Fira Mono";
          src: url(${require("./assets/fira/woff2/FiraMono-Bold.woff2")})
            format("woff2");
          src: url(${require("./assets/fira/woff/FiraMono-Bold.woff")})
            format("woff");
          font-weight: 600;
          font-style: normal;
        }
        body {
          font-size: 14px;
          font-weight: 400;
          font-family: "Fira Sans", "Helvetica Neue", Helvetica, Arial,
            sans-serif;
          button {
            font-family: inherit;
          }
        }
        *:focus {
          outline: none;
        }
      `}
    />
  </>
);

export const AppList = () => {
  return (
    <Wrapper>
      <Title>
        <h2>Examples</h2>
        <p>Open one of the examples to see how certain features work</p>
      </Title>
      <Main>
        {Object.keys(apps).map((app) => (
          <Tile key={app} href={`/?a=${app}`}>
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
  const p = s.get("a");
  if (!p) {
    return <AppList />;
  }
  return (
    <Styler>
      <GlobalStyles />
      {apps[p]()}
    </Styler>
  );
};
const rootDiv = document.getElementById("root");
const root = createRoot(rootDiv);
root.render(<App />);

const Styler = styled.div`
  display: contents;
  font-family: ${fontFamilySans};
`;
