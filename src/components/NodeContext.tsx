import React, { useReducer } from "react";
import { Node } from "./Editor/Input";
import shortid from "shortid";

export enum Actions {
  ADD,
  UPDATE,
  REMOVE,
  COMPLETE
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
  isCompleted: false
});

export const initialNodes: Node[] = [nodeTemplate()];

export const nodeReducer = (state: Node[], action: Action): Node[] => {
  switch (action.type) {
    case Actions.ADD:
      return action.node ? [action.node, ...state] : state;
    case Actions.REMOVE:
      return state.filter((node: Node) => node.id !== action.id);
    case Actions.UPDATE: {
      const newNodesState = [...state];

      if (action.node) {
        newNodesState.find(
          todo => action.node && todo.id === action.node.id
        )!.text = action.node.text;
      }

      return newNodesState;
    }
    case Actions.COMPLETE: {
      const newNodesState = [...state];
      newNodesState.find(
        todo => todo.id === action.id
      )!.isCompleted = !newNodesState.find(todo => todo.id === action.id)!
        .isCompleted;

      return newNodesState;
    }
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
