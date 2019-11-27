import * as React from "react";
import styled from "styled-components";
import shortid from "shortid";

import NodeFormComponent, { Node } from "./Form";
import NodeComponent from "./Node";

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
  const [nodes, setNodes] = React.useState<Node[]>([]);

  const handleNodeCreate = (node: Node) => {
    const newNodesState = [...nodes];
    newNodesState.push(node);

    setNodes(newNodesState);
  };

  const handleNodeUpdate = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newNodesState = [...nodes];
    newNodesState.find(todo => todo.id === id)!.text = event.target.value;

    setNodes(newNodesState);
  };

  const handleNodeRemove = (id: string) => {
    const newNodesState = nodes.filter(todo => todo.id !== id);

    setNodes(newNodesState);
  };

  const handleNodeComplete = (id: string) => {
    const newNodesState = [...nodes];
    newNodesState.find(
      todo => todo.id === id
    )!.isCompleted = !newNodesState.find(todo => todo.id === id)!.isCompleted;

    setNodes(newNodesState);
  };

  const handleNodeBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      event.target.classList.add("input-error");
    } else {
      event.target.classList.remove("input-error");
    }
  };

  const handleNodeAddSubNode = (id: string) => {
    const newNode: Node = {
      id: shortid.generate(),
      parent: id,
      text: "",
      isCompleted: false
    };
    const newNodesState = [...nodes];
    newNodesState.push(newNode);

    setNodes(newNodesState);
  };

  const rootNodes = nodes.filter(n => n.parent === null);
  const childNodes = (id: string): Node[] =>
    (nodes.filter(n => n.parent === id)) || [];

  return (
    <NodeEditorContainer>
      <NodeFormComponent nodes={nodes} handleNodeCreate={handleNodeCreate} />

      <ElementsContainer>
        <ul>
          {rootNodes.map(node => (
            <li key={node.id}>
              <NodeComponent
                node={node}
                handleNodeUpdate={handleNodeUpdate}
                handleNodeAddSubNode={handleNodeAddSubNode}
                handleNodeRemove={handleNodeRemove}
                handleNodeComplete={handleNodeComplete}
                handleNodeBlur={handleNodeBlur}
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
                        handleNodeBlur={handleNodeBlur}
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
