import { INetworkNode, NetworkNodeSelectionType } from "./types";

export const drawNodes = ({
  nodesGroup,
  nodesData,
  classes,
}: {
  nodesGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
  nodesData: INetworkNode[];
  classes: Record<"node", string>;
}): NetworkNodeSelectionType =>
  nodesGroup
    .selectAll<SVGCircleElement, unknown>("circle")
    .data(nodesData)
    .join("circle")
    .attr("class", classes.node)
    .attr("fill", "transparent")
    .attr("stroke", "transparent")
    .attr("stroke-width", 0);
