import React, { useReducer } from "react";
import styled from "styled-components";

import NodeInputComponent, { Node } from "./Input";
import NodeComponent from "./Node";
import {
  Actions,
  nodeReducer,
  nodeTemplate,
  initialNodes
} from "../NodeContext";

const NodeEditorContainer = styled.div`
  padding-top: 32px;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const ElementsContainer = styled.div`
  ul {
    padding: 0;
    margin: 0;
  }

  ul:not(:first-child) {
    margin-left: 1em;
  }

  li {
    list-style-type: none;
  }
`;

const NodeEditor = () => {
  const [nodes, dispatchNodes] = useReducer(nodeReducer, initialNodes);

  const handleNodeCreate = (node: Node) => {
    dispatchNodes({ type: Actions.ADD, node });
  };

  const handleNodeUpdate = (node: Node) => {
    dispatchNodes({ type: Actions.UPDATE, node });
  };

  const handleNodeRemove = (id: string) => {
    dispatchNodes({ type: Actions.REMOVE, id });
  };

  const handleNodeComplete = (id: string) => {
    dispatchNodes({ type: Actions.COMPLETE, id });
  };

  const handleNodeAddSubNode = (id: string) => {
    const newNode: Node = {
      ...nodeTemplate(),
      parent: id
    };
    dispatchNodes({ type: Actions.ADD, node: newNode });
  };

  const rootNodes = nodes.filter(n => n.parent === null);
  const childNodes = (id: string): Node[] =>
    nodes.filter(n => n.parent === id) || [];

  return (
    <NodeEditorContainer>
      <NodeInputComponent handleNodeCreate={handleNodeCreate} />

      <ElementsContainer>
        <ul>
          {nodes &&
            rootNodes.map(node => (
              <li key={node.id}>
                <NodeComponent
                  node={node}
                  handleNodeUpdate={handleNodeUpdate}
                  handleNodeAddSubNode={handleNodeAddSubNode}
                  handleNodeRemove={handleNodeRemove}
                  handleNodeComplete={handleNodeComplete}
                />
                {childNodes(node.id) &&
                  childNodes(node.id).map(node => (
                    <ul>
                      <li key={node.id}>
                        <NodeComponent
                          node={node}
                          handleNodeUpdate={handleNodeUpdate}
                          handleNodeAddSubNode={handleNodeAddSubNode}
                          handleNodeRemove={handleNodeRemove}
                          handleNodeComplete={handleNodeComplete}
                        />
                      </li>
                    </ul>
                  ))}
              </li>
            ))}
        </ul>
      </ElementsContainer>
    </NodeEditorContainer>
  );
};

export default NodeEditor;
