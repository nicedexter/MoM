import React, { useReducer } from "react";
import { Node } from "./AddNode";
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

export const nodeTemplate = (): Node => ({
  id: shortid.generate(),
  parent: null,
  text: "New node",
  complete: false
});

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
          return { ...node, ...action.node }
        }

        return node
      }) 
    case Actions.TOGGLE_COMPLETE: 
    return state.map(node => {
      if (node.id === action.id) {
        return { ...node, complete: !node.complete}
      }

      return node
    }) 
    default:
      throw new Error();
  }
};

// const NodeContext = React.createContext(initialState);
const NodeContext = <div></div>;

const NodeProvider = (props: any) => {
  const [state, dispatch] = useReducer(nodeReducer, initialNodes);

  return NodeContext;
  // <NodeContext.Provider value={{ state, dispatch }}>
  //   {props.children}
  // </NodeContext.Provider>
};
