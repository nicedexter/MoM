import * as React from "react";
import { Node } from "./Form";
import NodeComponent from "./Node";
import styled from "styled-components";

const ElementsContainer = styled.div`
  ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style-type: none;
  }
`;

export interface Elements {
  handleNodeUpdate: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  handleNodeRemove: (id: string) => void;
  handleNodeComplete: (id: string) => void;
  handleNodeBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nodes: Node[];
}

const ElementsComponent = (props: Elements) => {
  return (
    <ElementsContainer>
      <ul>
        {props.nodes.map(node => (
          <li key={node.id}>
            <NodeComponent
              node={node}
              handleNodeUpdate={props.handleNodeUpdate}
              handleNodeRemove={props.handleNodeRemove}
              handleNodeComplete={props.handleNodeComplete}
              handleNodeBlur={props.handleNodeBlur}
            />
          </li>
        ))}
      </ul>
    </ElementsContainer>
  );
};

export default ElementsComponent;
