import { FC, memo, useEffect, useRef } from "react";

import * as d3 from "d3";
import { INetworkLink, INetworkNode } from "./types";

const PADDING = { top: 10, right: 30, bottom: 30, left: 40 };

const BasicNetwork: FC<{
  className?: string;
  nodes: INetworkNode[];
  links: INetworkLink[];
}> = ({ className, nodes, links }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (container) {
      const { height, width } = container.getBoundingClientRect();

      const chartHeight = height - PADDING.top - PADDING.bottom;
      const chartWidth = width - PADDING.left - PADDING.right;

      const svg = d3
        .select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr(
          "transform",
          "translate(" + PADDING.left + "," + PADDING.top + ")"
        );

      const link = svg
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .style("stroke", "#aaa");

      const node = svg
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", (n) => n.r || 20)
        .style("fill", "#69b3a2");

      const ticked = () => {
        link
          .attr("x1", (d) => (typeof d.source === "object" && d.source.x) || 0)
          .attr("y1", (d) => (typeof d.source === "object" && d.source.y) || 0)
          .attr("x2", (d) => (typeof d.target === "object" && d.target.x) || 0)
          .attr("y2", (d) => (typeof d.target === "object" && d.target.y) || 0);

        node.attr("cx", (d) => d.x || 0).attr("cy", (d) => d.y || 0);
      };

      d3.forceSimulation(nodes)
        .force(
          "link",
          d3
            .forceLink<INetworkNode, INetworkLink>()
            .id((d) => d.id)
            .links(links)
        )
        .force("charge", d3.forceManyBody().strength(-400))
        .force("center", d3.forceCenter(chartWidth / 2, chartHeight / 2))
        .on("end", ticked);

      return () => {
        d3.select(container).remove();
      };
    }
  }, [nodes, links]);

  return <div ref={ref} className={className} />;
};

export default memo(BasicNetwork);
