import { FC, memo, useEffect, useRef } from "react";

import * as d3 from "d3";
import { ILink, INode } from "./types";

const linkStroke = "#999";
const linkStrokeOpacity = 0.6;
const linkStrokeWidth: ((link: ILink) => number) | number = 1.5;
const linkStrokeLinecap = "round";

const nodeFill = "currentColor";
const nodeStroke = "#fff";
const nodeStrokeWidth = 1.5;
const nodeStrokeOpacity = 1;
const nodeRadius = 5;

const ForceNetwork: FC<{
  className?: string;
  nodes: INode[];
  links: ILink[];
}> = ({ className, nodes, links }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (container) {
      const { height, width } = container.getBoundingClientRect();

      const ticked = () => {
        link
          .attr("x1", (l) => (typeof l.source === "object" && l.source.x) || 0)
          .attr("y1", (l) => (typeof l.source === "object" && l.source.y) || 0)
          .attr("x2", (l) => (typeof l.target === "object" && l.target.x) || 0)
          .attr("y2", (l) => (typeof l.target === "object" && l.target.y) || 0);

        node.attr("cx", (n) => n.x || 0).attr("cy", (n) => n.y || 0);
      };

      const simulation = d3
        .forceSimulation<INode>(nodes)
        .force(
          "link",
          d3.forceLink<INode, ILink>(links).id((n) => n.id)
        )
        .force("charge", d3.forceManyBody())
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .on("tick", ticked);

      // setTimeout(() => {
      //   simulation.stop();
      // }, 1000);

      const svg = d3
        .select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height]);

      const link = svg
        .append("g")
        .attr("stroke", linkStroke)
        .attr("stroke-opacity", linkStrokeOpacity)
        .attr(
          "stroke-width",
          typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null
        )
        .attr("stroke-linecap", linkStrokeLinecap)
        .selectAll("line")
        .data(links)
        .join("line");

      if (typeof linkStrokeWidth === "function")
        link.attr("stroke-width", linkStrokeWidth);

      const node = svg
        .append("g")
        .attr("fill", nodeFill)
        .attr("stroke", nodeStroke)
        .attr("stroke-opacity", nodeStrokeOpacity)
        .attr("stroke-width", nodeStrokeWidth)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", nodeRadius)

        .call(
          d3
            .drag()
            .on("start", (event) => {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              event.subject.fx = event.subject.x;
              event.subject.fy = event.subject.y;
            })
            .on("drag", (event) => {
              event.subject.fx = event.x;
              event.subject.fy = event.y;
            })
            .on("end", (event) => {
              if (!event.active) simulation.alphaTarget(0);
              event.subject.fx = null;
              event.subject.fy = null;
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }) as any
        );
      return () => {
        d3.select(container).remove();
      };
    }
  }, [nodes, links]);

  return <div ref={ref} className={className} />;
};

export default memo(ForceNetwork);
