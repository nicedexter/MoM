import React, { useContext, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountTree from "@material-ui/icons/AccountTree";
import { Action, Actions, NodeContext } from "../State/NodeContext";

const useStyles = makeStyles({
  fullList: {
    width: "auto"
  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const context = useContext(NodeContext);
  const nodes = context && context.nodes;
  const dispatch = context && context.dispatch;

  const rootNodes = nodes && nodes.filter(n => n.parent === null);

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Nodes</Button>
      <SwipeableDrawer
        anchor="top"
        open={open}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <div
          className={classes.fullList}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {rootNodes &&
              rootNodes.map(node => (
                <ListItem button key={node.id}>
                  <ListItemIcon>{<AccountTree />}</ListItemIcon>
                  <ListItemText primary={node.text} />
                </ListItem>
              ))}
          </List>
        </div>
      </SwipeableDrawer>
    </div>
  );
}
