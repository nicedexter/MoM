import CssBaseline from "@material-ui/core/CssBaseline";
import NodeBook from "./components/NodeBook/index";
import { NodeProvider } from "./components/State/NodeContext";
import Layout from "./components/Layout";

import React, { memo } from "react";
import { AppBar, Toolbar, Typography, Paper } from "@material-ui/core";

export default () => (
  <Layout>
    <NodeProvider>
      <NodeBook />
      {/* <Tree /> */}
    </NodeProvider>
  </Layout>
);
