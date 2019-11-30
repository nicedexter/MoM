import React, { useReducer, useEffect } from "react";
import { Node } from "../NodeBook/AddNode";
import shortid from "shortid";

export enum Actions {
  ADD,
  UPDATE,
  REMOVE,
  TOGGLE_COMPLETE
}

export interface Action {
  type: Actions;
  id?: string;
  node?: Node;
}

export interface NodeContext {
  nodes: Node[];
  dispatch: React.Dispatch<Action>;
}

export const nodeTemplate = (parent: string | null = null): Node => ({
  id: shortid.generate(),
  parent,
  text: "New node",
  complete: false
});

const localNodesString = localStorage.getItem("nodes");
const localNodes = localNodesString && JSON.parse(localNodesString);
export const initialNodes: Node[] = [nodeTemplate()];

export const nodeReducer = (state: Node[], action: Action): Node[] => {
  switch (action.type) {
    case Actions.ADD:
      return action.node ? [action.node, ...state] : state;
    case Actions.REMOVE:
      return state.filter((node: Node) => node.id !== action.id);
    case Actions.UPDATE:
      return state.map(node => {
        if (node.id === action.id) {
          return { ...node, ...action.node };
        }

        return node;
      });
    case Actions.TOGGLE_COMPLETE:
      return state.map(node => {
        if (node.id === action.id) {
          return { ...node, complete: !node.complete };
        }

        return node;
      });
    default:
      throw new Error();
  }
};

export const NodeContext = React.createContext<NodeContext | null>(null);

export const NodeProvider = (props: any) => {
  const [nodes, dispatch] = useReducer(nodeReducer, localNodes || initialNodes);

  useEffect(() => {
    localStorage.setItem("nodes", JSON.stringify(nodes));
  }, [nodes]);

  return (
    <NodeContext.Provider value={{ nodes, dispatch }}>
      {props.children}
    </NodeContext.Provider>
  );
};
