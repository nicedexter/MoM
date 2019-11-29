import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import { createGlobalStyle } from "styled-components";
import NodeBook from "./components/NodeBook/index";
import Tree from "./components/Visualization/Tree";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    width: 100%;
    height: 100%;
    min-height: 100vh;
  }
`;

const AppBox = styled.div`
  display: flex;
`;

export default () => (
  <AppBox>
    <GlobalStyle />
    <NodeBook />
    <Tree />
  </AppBox>
);
