import React, { useReducer, useContext } from "react";
import styled from "styled-components";

import AddNode, { Node } from "./AddNode";
import Filter from "./Filter";
import { filterReducer, FilterState } from "../State/FilterReducer";
import List from "./List";
import { Action, Actions, NodeContext } from "../State/NodeContext";

const NodeEditorContainer = styled.div`
  padding-top: 32px;
  margin-left: 32px;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-flow: column nowrap;
`;

const NodeBook = () => {
  let nodes: Node[] | null;
  let dispatch: React.Dispatch<Action> | null;

  const context = useContext(NodeContext);
  nodes = context && context.nodes;
  dispatch = context && context.dispatch;

  const [filter, dispatchFilter] = useReducer(filterReducer, FilterState.ALL);

  const handleNodeCreate = (node: Node) => {
    dispatch && dispatch({ type: Actions.ADD, node });
  };

  const filteredNodes =
    nodes &&
    nodes.filter(node =>
      filter === FilterState.ALL ||
      (filter === FilterState.COMPLETED && node.complete) ||
      (filter === FilterState.INCOMPLETED && !node.complete)
        ? true
        : false
    );

  const rootNodes =
    filteredNodes && filteredNodes.filter(n => n.parent === null);
  const childNodes = (id: string): Node[] =>
    (filteredNodes && filteredNodes.filter(n => n.parent === id)) || [];

  return (
    <NodeEditorContainer>
      <Filter dispatch={dispatchFilter} />
      <AddNode handleNodeCreate={handleNodeCreate} />
      <List nodes={filteredNodes} />
    </NodeEditorContainer>
  );
};

export default NodeBook;
