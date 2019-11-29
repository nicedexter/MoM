import Cytoscape from "cytoscape";
import LayoutPlugin from "cytoscape-dagre";
import React from "react";
import CytoscapeComponent from "react-cytoscapejs";
import styled from "styled-components";

Cytoscape.use(LayoutPlugin);

const Container = styled.div`
  width: 100%;
  height: 100%;

  .__________cytoscape_container {
    width: calc(100% - 32px);
    height: calc(100% - 32px);
    border: 0;
    position: fixed;
  }
`;

const elements = [
  { data: { id: "a", parent: "b" } },
  { data: { id: "b" } },
  { data: { id: "c", parent: "b" } },
  { data: { id: "d" } },
  { data: { id: "e" } },
  { data: { id: "f", parent: "e" } },
  { data: { id: "ad", source: "a", target: "d" } },
  { data: { id: "eb", source: "e", target: "b" } }
];

const stylesheet = [
  {
    selector: "node",
    style: {
      width: 20,
      height: 20,
      label: "data(id)",
      shape: "ellipse",
      "font-size": "8px"
    }
  },
  {
    selector: "edge",
    style: {
      width: 1
    }
  }
];

const layout = { name: "dagre" };

export default () => (
  <Container>
    <CytoscapeComponent
      elements={elements}
      layout={layout}
      stylesheet={stylesheet}
    />
  </Container>
);
