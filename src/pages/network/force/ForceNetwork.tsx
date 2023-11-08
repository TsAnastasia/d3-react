import { FC, memo, useEffect, useRef } from "react";

import * as d3 from "d3";
import { ILink, INode } from "./types";

const linkStroke = "#999";
const linkStrokeOpacity = 0.6;
const linkStrokeWidth: ((link: ILink) => number) | number = 1.5;
const linkStrokeLinecap = "round";

const markerColor = linkStroke;

const nodeFill = "#fff"; // #fff transparent currentColor;
const nodeStroke = "#000";
const nodeStrokeWidth = 1;
const nodeStrokeOpacity = 1;
const nodeRadius = 20;
const nodeFillSelected = "var(--color-primary)";

const forceSimulationStrength = -1200;

const ForceNetwork: FC<{
  className?: string;
  nodes: INode[];
  links: ILink[];
  selectedNode?: INode;
  onNodeClick?: (node?: INode) => void;
}> = ({
  className,
  nodes: nodesData,
  links: linksData,
  onNodeClick,
  selectedNode,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const resetZoom = useRef<() => void>();
  const nodeRef =
    useRef<d3.Selection<SVGCircleElement, INode, SVGGElement, unknown>>();

  useEffect(() => {
    const divContainer = ref.current;
    if (divContainer) {
      const width = ref.current?.clientWidth || 0;
      const height = ref.current?.clientHeight || 0;

      const ticked = () => {
        link
          .attr("x1", (l) => (typeof l.source === "object" && l.source.x) || 0)
          .attr("y1", (l) => (typeof l.source === "object" && l.source.y) || 0)
          .attr("x2", (l) => (typeof l.target === "object" && l.target.x) || 0)
          .attr("y2", (l) => (typeof l.target === "object" && l.target.y) || 0);

        node.attr("cx", (n) => n.x || 0).attr("cy", (n) => n.y || 0);
      };
      const nodes = nodesData.map((n) => ({ ...n }));
      const links = linksData.map((l) => ({ ...l }));

      const simulation = d3
        .forceSimulation<INode>(nodes)
        .force(
          "link",
          d3.forceLink<INode, ILink>(links).id((n) => n.id)
        )
        .force("charge", d3.forceManyBody().strength(forceSimulationStrength))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .on("tick", ticked);

      // simulation.stop();
      // setTimeout(() => {
      //   simulation.stop();
      // }, 1000);

      const svg = d3
        .select(divContainer)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height]);

      const container = svg.append("g");

      svg
        .append("svg:defs")
        .selectAll("marker")
        .data(["arrow"])
        .enter()
        .append("svg:marker")
        .attr("id", String)
        .attr("viewBox", "0 0 10 10")
        .attr("fill", markerColor)
        .attr("refX", 10 + 0.8 * nodeRadius)
        .attr("refY", 5)
        .attr("markerWidth", 8)
        .attr("markerHeight", 8)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z");

      const link = container
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
        .join("line")
        .attr("marker-end", "url(#arrow)");

      if (typeof linkStrokeWidth === "function")
        link.attr("stroke-width", linkStrokeWidth);

      const node = container
        .append("g")
        .attr("fill", nodeFill)
        .attr("stroke", nodeStroke)
        .attr("stroke-opacity", nodeStrokeOpacity)
        .attr("stroke-width", nodeStrokeWidth)
        .selectAll<SVGCircleElement, INode>("circle")
        .data(nodes)
        .join("circle")
        .attr("r", nodeRadius);

      nodeRef.current = node;

      node.call(
        d3
          .drag<SVGCircleElement, INode>()
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
          })
      );

      if (onNodeClick)
        node.on("click", (_, node) =>
          onNodeClick(nodesData.find((n) => n.id === node.id))
        );

      const zoom = d3
        .zoom<SVGSVGElement, unknown>()
        .extent([
          [-300, -300],
          [300, 300],
        ])
        .scaleExtent([0.5, 8])
        .on("zoom", ({ transform }) => {
          container.attr("transform", transform);
        });

      svg.call(zoom);

      resetZoom.current = () => {
        svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
      };

      return () => {
        nodeRef.current = undefined;
        resetZoom.current = undefined;
        d3.select(divContainer).remove();
      };
    }
  }, [nodesData, linksData, onNodeClick]);

  useEffect(() => {
    if (nodeRef.current)
      nodeRef.current.attr("fill", (n) =>
        n.id === selectedNode?.id ? nodeFillSelected : nodeFill
      );
  }, [selectedNode]);

  return (
    <div ref={ref} className={className} style={{ position: "relative" }}>
      <button
        type="button"
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 10,
          width: 30,
          height: 30,
        }}
        onClick={() => resetZoom.current && resetZoom.current()}
      />
    </div>
  );
};

export default memo(ForceNetwork);
