import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import AppBar from "./components/AppBar";
import NodeBook from "./components/NodeBook/index";
import { NodeProvider } from "./components/State/NodeContext";
import Drawer from "./components/NodeBook/Drawer";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 0,
    margin: 0,
    backgroundColor: "#fafafa"
  }
});

export default () => {
  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.root}>
      <NodeProvider>
        <CssBaseline />
        <AppBar>
          <Drawer />
        </AppBar>
        <NodeBook />
      </NodeProvider>
    </Paper>
  );
};
