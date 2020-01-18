import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import { Actions, NodeContext, nodeTemplate } from "../State/NodeContext";
import { Node } from "./AddNode";
import NodeComponent from "./Node";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  sub: {
    marginLeft: '16px'
  }
}));

const NodeEditor = ({ nodes }: { nodes: Node[] | null }) => {
  const context = useContext(NodeContext);
  const dispatch = context && context.dispatch;

  const handleNodeUpdate = (node: Node) => {
    dispatch && dispatch({ type: Actions.UPDATE, id: node.id, node });
  };

  const handleNodeRemove = (id: string) => {
    dispatch && dispatch({ type: Actions.REMOVE, id });
  };

  const handleNodeToggleComplete = (id: string) => {
    dispatch && dispatch({ type: Actions.TOGGLE_COMPLETE, id });
  };

  const handleNodeAddSubNode = (id: string) => {
    const newNode: Node = {
      ...nodeTemplate(),
      parent: id
    };
    dispatch && dispatch({ type: Actions.ADD, node: newNode });
  };

  const rootNodes = nodes && nodes.filter((n: Node) => n.parent === null);
  const childNodes = (id: string): Node[] =>
    (nodes && nodes.filter((n: Node) => n.parent === id)) || [];

  const classes = useStyles();

  return (
    <List className={classes.root}>
      {rootNodes &&
        rootNodes.map(node => (
          <>
            <NodeComponent
              node={node}
              handleNodeUpdate={handleNodeUpdate}
              handleNodeAddSubNode={handleNodeAddSubNode}
              handleNodeRemove={handleNodeRemove}
              handleNodeComplete={handleNodeToggleComplete}
            />
            {childNodes(node.id) &&
              childNodes(node.id).map((node: Node) => (
                <List className={classes.sub}>
                    <NodeComponent
                      node={node}
                      handleNodeUpdate={handleNodeUpdate}
                      handleNodeRemove={handleNodeRemove}
                      handleNodeComplete={handleNodeToggleComplete}
                    />
                  </List>
              ))}
          </>
        ))}
    </List>
  );
};

export default NodeEditor;
