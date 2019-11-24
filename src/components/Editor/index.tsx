import * as React from "react";
import NodeFormComponent, { Node } from "./Form";
import ElementsComponent from "./Elements";
import styled from "styled-components";

const NodeEditorContainer = styled.div`
  padding-top: 32px;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const NodeEditor = () => {
  const [nodes, setNodes] = React.useState<Node[]>([]);

  const handleNodeCreate = (todo: Node) => {
    const newNodesState = [...nodes];
    newNodesState.push(todo);

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
      event.target.classList.add("todo-input-error");
    } else {
      event.target.classList.remove("todo-input-error");
    }
  };

  return (
    <NodeEditorContainer>
      <NodeFormComponent nodes={nodes} handleNodeCreate={handleNodeCreate} />

      <ElementsComponent
        nodes={nodes}
        handleNodeUpdate={handleNodeUpdate}
        handleNodeRemove={handleNodeRemove}
        handleNodeComplete={handleNodeComplete}
        handleNodeBlur={handleNodeBlur}
      />
    </NodeEditorContainer>
  );
};

export default NodeEditor;
