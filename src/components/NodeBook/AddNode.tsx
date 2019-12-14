import { Paper, TextField } from "@material-ui/core";
import * as React from "react";
import shortid from "shortid";

export interface Node {
  id: string;
  parent: string | null;
  text: string;
  complete: boolean;
}

export interface NodeInput {
  handleNodeCreate: (node: Node) => void;
}

const AddNodeComponent = (props: NodeInput) => {
  const [text, setText] = React.useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleInputEnter = (event: React.KeyboardEvent) => {
    if (text) {
      const newNode: Node = {
        id: shortid.generate(),
        parent: null,
        text: text,
        complete: false
      };
      props.handleNodeCreate(newNode);
    }

    setText("");
    event.preventDefault();
  };

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <TextField
        value={text}
        placeholder="New node"
        fullWidth
        onChange={handleInputChange}
        onKeyPress={event => event.key === "Enter" && handleInputEnter(event)}
      />
    </Paper>
  );
};

export default AddNodeComponent;
