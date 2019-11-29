import React, { useContext } from "react";
import styled from "styled-components";

import { Node } from "./AddNode";
import NodeComponent from "./Node";
import { Actions, NodeContext, nodeTemplate } from "../State/NodeContext";

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

const NodeEditor = ({ nodes }: { nodes: Node[] | null}) => {
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
  nodes &&  nodes.filter((n: Node) => n.parent === id) || [];

  return (
    <ElementsContainer>
      <ul>
        {rootNodes &&
          rootNodes.map((node: Node) => (
            <li key={node.id}>
              <NodeComponent
                node={node}
                handleNodeUpdate={handleNodeUpdate}
                handleNodeAddSubNode={handleNodeAddSubNode}
                handleNodeRemove={handleNodeRemove}
                handleNodeComplete={handleNodeToggleComplete}
              />
              {childNodes(node.id) &&
                childNodes(node.id).map((node: Node) => (
                  <ul>
                    <li key={node.id}>
                      <NodeComponent
                        node={node}
                        handleNodeUpdate={handleNodeUpdate}
                        handleNodeAddSubNode={handleNodeAddSubNode}
                        handleNodeRemove={handleNodeRemove}
                        handleNodeComplete={handleNodeToggleComplete}
                      />
                    </li>
                  </ul>
                ))}
            </li>
          ))}
      </ul>
    </ElementsContainer>
  );
};

export default NodeEditor;
