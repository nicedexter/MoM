import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import AccountTree from "@material-ui/icons/AccountTree";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useContext } from "react";
import { NodeContext } from "../State/NodeContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2)
    },
    fullList: {
      width: "auto"
    }
  })
);

export default function Drawer() {
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
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
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
