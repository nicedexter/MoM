import * as React from "react";
import shortid from "shortid";
import styled from "styled-components";

export interface Node {
  id: string;
  parent: string | null;
  text: string;
  complete: boolean;
}

const AddNodeContainer = styled.div`
  input {
    border: 1px solid #ccc;
  }

  input:focus {
    outline: 0;
    border: 1px solid #007bff;
  }
`;

export interface NodeInput {
  handleNodeCreate: (node: Node) => void;
}

const AddNodeComponent = (props: NodeInput) => {
  const [text, setText] = React.useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <AddNodeContainer>
      <input
        value={text}
        type="text"
        placeholder="New node"
        onChange={event => handleInputChange(event)}
        onKeyPress={event => event.key === "Enter" && handleInputEnter(event)}
      />
    </AddNodeContainer>
  );
};

export default AddNodeComponent;
