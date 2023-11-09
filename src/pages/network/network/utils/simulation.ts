import * as d3 from "d3";
import {
  INetworkLink,
  INetworkNode,
  NetworkLinkSelectionType,
  NetworkNodeSelectionType,
} from "./types";

// TODO
const forceSimulationStrength = -1200;

export const simulation = ({
  nodesData,
  linksData,
  nodes,
  links,
}: {
  nodesData: INetworkNode[];
  linksData: INetworkLink[];
  nodes: NetworkNodeSelectionType;
  links: NetworkLinkSelectionType;
}): d3.Simulation<INetworkNode, undefined> =>
  d3
    .forceSimulation<INetworkNode>(nodesData)
    .force(
      "link",
      d3.forceLink<INetworkNode, INetworkLink>(linksData).id((n) => n.id)
    )
    .force("charge", d3.forceManyBody().strength(forceSimulationStrength))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .on("tick", () => {
      links
        .attr("x1", (l) => (typeof l.source === "object" && l.source.x) || 0)
        .attr("y1", (l) => (typeof l.source === "object" && l.source.y) || 0)
        .attr("x2", (l) => (typeof l.target === "object" && l.target.x) || 0)
        .attr("y2", (l) => (typeof l.target === "object" && l.target.y) || 0);

      nodes.attr("cx", (n) => n.x || 0).attr("cy", (n) => n.y || 0);
    });
