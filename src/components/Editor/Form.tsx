import * as React from "react";
import shortid from "shortid";
import styled from "styled-components";

export interface Node {
  id: string;
  parent: string | null;
  text: string;
  isCompleted: boolean;
}

const NodeFormContainer = styled.div`
  input {
    border: 1px solid #ccc;
  }

  input:focus {
    outline: 0;
    border: 1px solid #007bff;
  }
`;

export interface NodeForm {
  nodes: Node[];
  handleNodeCreate: (node: Node) => void;
}

const NodeFormComponent = (props: NodeForm) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [formState, setFormState] = React.useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(event.target.value);
  };

  const handleInputEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      const newNode: Node = {
        id: shortid.generate(),
        parent: null,
        text: formState,
        isCompleted: false
      };

      props.handleNodeCreate(newNode);

      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <NodeFormContainer>
      <input
        ref={inputRef}
        type="text"
        placeholder="New node"
        onChange={event => handleInputChange(event)}
        onKeyPress={event => handleInputEnter(event)}
      />
    </NodeFormContainer>
  );
};

export default NodeFormComponent;
