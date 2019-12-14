import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { memo } from "react";

const useStyles = makeStyles({
  title: {
    flexGrow: 1
  }
});

const Layout = memo(props => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        {props.children}
        <Typography color="inherit" className={classes.title}>
          MoM APP - acyclical undirected graph notes
        </Typography>
      </Toolbar>
    </AppBar>
  );
});

export default Layout;
