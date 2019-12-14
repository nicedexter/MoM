import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextField from "@material-ui/core/TextField";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import * as React from "react";
import { Node } from "./AddNode";

interface NodeActions {
  handleNodeUpdate: (node: Node) => void;
  handleNodeAddSubNode: (id: string) => void;
  handleNodeRemove: (id: string) => void;
  handleNodeComplete: (id: string) => void;
  node: Node;
}

const handleNodeBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.value.length === 0) {
    event.target.classList.add("input-error");
  } else {
    event.target.classList.remove("input-error");
  }
};

const NodeComponent = (props: NodeActions) => {
  const handleNodeUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextNode = {
      ...props.node,
      text: event.currentTarget.value
    };
    props.handleNodeUpdate(nextNode);
  };

  const labelId = `checkbox-list-label-${props.node.text}`;
  const { handleNodeComplete, handleNodeRemove, node } = props;

  return (
    <ListItem
      key={props.node.id}
      role={undefined}
      dense
      button
      // onClick={handleToggle(value)}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={node.complete}
          tabIndex={-1}
          disableRipple
          onClick={() => handleNodeComplete(node.id)}
          inputProps={{ "aria-labelledby": labelId }}
        />
      </ListItemIcon>
      {/* <ListItemText id={labelId} primary={node.text} /> */}
      <TextField
        placeholder="New node"
        value={node.text}
        onChange={handleNodeUpdate}
        // onKeyPress={props.onInputKeyPress}
        fullWidth
      />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="Delete Node"
          onClick={() => handleNodeRemove(node.id)}
        >
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default NodeComponent;
