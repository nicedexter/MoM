import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import { createGlobalStyle } from "styled-components";
import Editor from "./components/Editor";
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

export default () => (
  <>
    <GlobalStyle />
    <Editor />
    <Tree />
  </>
);
