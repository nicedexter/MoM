import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import NodeBook from "./components/NodeBook/index";
import { NodeProvider } from "./components/State/NodeContext";
import Tree from "./components/Visualization/Tree";

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
  <NodeProvider>
    <AppBox>
      <GlobalStyle />
      <NodeBook />
      <Tree />
    </AppBox>
  </NodeProvider>
);
