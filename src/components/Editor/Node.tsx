// Import dependencies
import * as React from "react";
import { Node } from "./Input";
import styled from "styled-components";

interface NodeActions {
  handleNodeUpdate: (node: Node) => void;
  handleNodeAddSubNode: (id: string) => void;
  handleNodeRemove: (id: string) => void;
  handleNodeComplete: (id: string) => void;
  node: Node;
}

const NodeContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 8px;

  .wrapper {
    flex-grow: 1;
    padding: 0 16px;
  }

  input {
    width: 100%;
    border: 0;
    border-bottom: 1px solid transparent;
    transition: 0.25s border-bottom ease-in-out;
  }

  input:focus {
    outline: 0;
    border-bottom: 1px solid #007bff;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 0;
    transition: 0.25s all ease-in-out;
  }

  .unchecked {
    border: 1px solid #ececec;
  }

  .unchecked:hover {
    background: #28a745;
    border: 1px solid #ccc;
  }

  .checked {
    color: #fff;
    background: #28a745;
    border: 0;
  }

  .add {
    display: flex;
    padding-left: 8px;
    padding-right: 8px;
    font-size: 28px;
    cursor: pointer;
    line-height: 1;
    color: #ececec;
    transition: 0.25s color ease-in-out;
  }

  .remove {
    display: flex;
    padding-left: 8px;
    padding-right: 8px;
    font-size: 28px;
    cursor: pointer;
    line-height: 1;
    color: #ececec;
    transition: 0.25s color ease-in-out;
  }

  .remove:hover {
    color: #111;
  }

  .input-error {
    border-bottom: 1px solid red;
  }
`;

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

  return (
    <NodeContainer>
      <div onClick={() => props.handleNodeComplete(props.node.id)}>
        {props.node.isCompleted ? (
          <span className="checked">&#x2714;</span>
        ) : (
          <span className="unchecked" />
        )}
      </div>

      <div className="wrapper">
        <input
          value={props.node.text}
          onBlur={handleNodeBlur}
          onChange={handleNodeUpdate}
        />
      </div>

      <div
        className="add"
        onClick={() => props.handleNodeAddSubNode(props.node.id)}
      >
        &#x02937;
      </div>

      <div
        className="remove"
        onClick={() => props.handleNodeRemove(props.node.id)}
      >
        &#x02A2F;
      </div>
    </NodeContainer>
  );
};

export default NodeComponent;
