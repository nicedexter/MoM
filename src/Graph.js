// tslint:disable:no-console
import React, { Component } from "react";
import { ReactCytoscape, cytoscape } from "react-cytoscape";
import {
  Grid,
  Row,
  Col,
  Button,
  ButtonToolbar,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import "./Graph.css";

class Graph extends Component {
  state = {
    elements: {
      edges: [
        { data: { id: "ad", source: "a", target: "d" } },
        { data: { id: "eb", source: "e", target: "b" } }
      ],
      nodes: [
        { data: { id: "a", parent: "b" }, position: { x: 215, y: 85 } },
        { data: { id: "b" } },
        { data: { id: "c", parent: "b" }, position: { x: 300, y: 85 } },
        { data: { id: "d" }, position: { x: 215, y: 175 } },
        { data: { id: "e" } },
        { data: { id: "f", parent: "e" }, position: { x: 300, y: 175 } }
      ]
    }
  };

  render() {
    const { elements } = this.state;
    return (
      <Grid>
        <Row>
          <Col sm={8}>
            <ReactCytoscape
              containerID="cy"
              elements={elements}
              cyRef={cy => {
                this.cyRef(cy);
              }}
              cytoscapeOptions={{ wheelSensitivity: 0.1 }}
              layout={{ name: "dagre" }}
            />
          </Col>
        </Row>
      </Grid>
    );
  }

  handleTap(event) {
    console.log("handleTap", event.type);
    const cy = this.cy;
    const { target } = event;

    if (target === cy) {
      const newNode = {
        data: { id: Math.round(Math.random() * 100000) },
        group: "nodes",
        position: event.position
      };
      cy.add(newNode);
    } else if (target.isEdge()) {
      cy.remove(target);
    } else if (target.isNode()) {
      console.log(target);
    }
  }

  handleDrag(event) {
    console.log("handleGrab", event.type);
    const { target, type } = event;
    const cy = this.cy;

    if (type === "free") {
      cy.removeListener("tapdrag");

      return;
    }

    let handled = false;
    const self = this;
    const nodes = cy.nodes();

    const nearestNodeFrom = (p, max = 20) => {
      nodes.forEach(n => {
        const p1 = n.position();
        const distance = Math.sqrt(
          Math.pow(p1.x - p.x, 2) + Math.pow(p1.y - p.y, 2),
          2
        );
        n.data("distance", distance);
      });

      const { ele } = nodes
        .filter(n => n.id() !== target.id())
        .filter(`[distance < '${max}']`)
        .min(n => n.data("distance"));

      return ele;
    };

    cy.on("tapdrag", function(evt) {
      const nearestNode = nearestNodeFrom(evt.position);

      if (!nearestNode || handled) {
        return;
      }

      handled = true;

      const s = target.id();
      const t = nearestNode.id();
      const id = `${s}${t}`;
      const edges = nearestNode.edgesWith(target);

      if (edges.length) {
        cy.remove(edges.shift());
      } else {
        cy.add({
          data: { id, source: s, target: t },
          group: "edges"
        });
      }
    });
  }

  cyRef(cy) {
    this.cy = cy;
    const self = this;
    cy.on("tap", function(evt) {
      self.handleTap(evt);
    });
    cy.on("grabon", function(evt) {
      self.handleDrag(evt);
    });
    cy.on("free", function(evt) {
      self.handleDrag(evt);
    });
  }

  // handleEval() {
  //   const cy = this.cy;
  //   const str = this.text.value;
  //   // eval(str);
  // }
}

export default Graph;
