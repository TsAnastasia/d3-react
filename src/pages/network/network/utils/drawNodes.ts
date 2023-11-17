import { INetworkNode, NetworkNodeSelectionType } from "./types";

export const drawNodes = ({
  nodesGroup,
  nodesData,
  classes,
}: {
  nodesGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
  nodesData: INetworkNode[];
  classes: Record<"node", string>;
}): NetworkNodeSelectionType => {
  const nodes = nodesGroup
    .selectAll<SVGCircleElement, unknown>("circle")
    .data(nodesData)
    .join("g")
    .attr("class", classes.node);

  nodes
    .append("circle")
    .attr("fill", "transparent")
    .attr("stroke", "transparent")
    .attr("stroke-width", 0);

  nodes
    .append("text")
    .attr("x", 7)
    .attr("y", "0.31em")
    .attr("stroke", "black")
    .text((n) => n.name || n.id);

  return nodes;
};
