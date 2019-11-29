import React, { useReducer } from "react";
import styled from "styled-components";

import AddNode, { Node } from "./AddNode";
import Filter from "./Filter";
import { filterReducer, FilterState } from "./FilterReducer";
import List from "./List";
import { Actions, initialNodes, nodeReducer } from "./NodeContext";

const NodeEditorContainer = styled.div`
  padding-top: 32px;
  margin-left: 32px;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-flow: column nowrap;
`;

const NodeBook = () => {
  const [nodes, dispatchNodes] = useReducer(nodeReducer, initialNodes);
  const [filter, dispatchFilter] = useReducer(filterReducer, FilterState.ALL);

  const handleNodeCreate = (node: Node) => {
    dispatchNodes({ type: Actions.ADD, node });
  };

  const filteredNodes = nodes.filter(node =>
    filter === FilterState.ALL ||
    (filter === FilterState.COMPLETED && node.complete) ||
    (filter === FilterState.INCOMPLETED && !node.complete)
      ? true
      : false
  );

  const rootNodes = filteredNodes.filter(n => n.parent === null);
  const childNodes = (id: string): Node[] =>
    filteredNodes.filter(n => n.parent === id) || [];

  return (
    <NodeEditorContainer>
      <Filter dispatch={dispatchFilter} />
      <AddNode handleNodeCreate={handleNodeCreate} />
      <List dispatch={dispatchNodes} nodes={filteredNodes} />
    </NodeEditorContainer>
  );
};

export default NodeBook;
