import React, { useContext, useReducer } from "react";

import { filterReducer, FilterState } from "../State/FilterReducer";
import { Actions, NodeContext } from "../State/NodeContext";
import AddNode, { Node } from "./AddNode";
import List from "./List";

const NodeBook = () => {
  const context = useContext(NodeContext);
  const nodes = context && context.nodes;
  const dispatch = context && context.dispatch;

  const [filter] = useReducer(filterReducer, FilterState.ALL);

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

  return (
    <>
      {/* <Filter dispatch={dispatchFilter} /> */}
      <AddNode handleNodeCreate={handleNodeCreate} />
      <List nodes={filteredNodes} />
    </>
  );
};

export default NodeBook;
