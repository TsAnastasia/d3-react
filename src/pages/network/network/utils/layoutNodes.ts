import { INetworkNode, INetworkNodesOptions } from "./types";

export const layoutNodes = ({
  nodesGroup,
  classes,
  options,
}: {
  nodesGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
  classes: Record<"node", string>;
  options: INetworkNodesOptions;
}) => {
  const nodes = nodesGroup.selectAll<SVGCircleElement, INetworkNode>(
    "." + classes.node
  );

  nodes
    .select("circle")
    .attr("r", options.nodeRadius)
    .attr("fill", options.nodeColor)
    .attr("stroke", options.nodeStrokeColor)
    .attr("stroke-width", options.nodeStrokeWidth);
  if (options.nodeStrokeOpacity)
    nodes.attr("stroke-opacity", options.nodeStrokeOpacity);
};
