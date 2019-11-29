import React from 'react';
import styled from 'styled-components';

import { Node } from './AddNode';
import NodeComponent from './Node';
import { Action, Actions, nodeTemplate } from './NodeContext';

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

const NodeEditor = ({
  nodes,
  dispatch
}: {
  nodes: Node[];
  dispatch: React.Dispatch<Action>;
}) => {
  const handleNodeCreate = (node: Node) => {
    dispatch({ type: Actions.ADD, node });
  };

  const handleNodeUpdate = (node: Node) => {
    dispatch({ type: Actions.UPDATE, id: node.id, node });
  };

  const handleNodeRemove = (id: string) => {
    dispatch({ type: Actions.REMOVE, id });
  };

  const handleNodeToggleComplete = (id: string) => {
    dispatch({ type: Actions.TOGGLE_COMPLETE, id });
  };

  const handleNodeAddSubNode = (id: string) => {
    const newNode: Node = {
      ...nodeTemplate(),
      parent: id
    };
    dispatch({ type: Actions.ADD, node: newNode });
  };

  const rootNodes = nodes.filter(n => n.parent === null);
  const childNodes = (id: string): Node[] =>
    nodes.filter(n => n.parent === id) || [];

  return (
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
                handleNodeComplete={handleNodeToggleComplete}
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
