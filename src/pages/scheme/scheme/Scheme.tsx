import scss from "./scheme.module.scss";

import * as d3 from "d3";
import { FC, memo, useEffect, useMemo, useRef } from "react";

import {
  ISchemeEdge,
  ISchemeNode,
  ISVGSchemeEdge,
  SchemeEdgeSVGSelectionType,
  // ISVGSchemeEdge,
  SchemeSVGSelectionType,
} from "./utils/types";

const NODE_WIDTH = 200;
const NODE_HEIGHT = 50;

const Scheme: FC<{
  id?: string;
  edges: ISchemeEdge[];
  nodes: ISchemeNode[];
  selected: ISchemeNode | undefined;
  selectNode(node: ISchemeNode): void;
  className?: string;
  width?: number;
  height?: number;
}> = ({
  id = "scheme",
  nodes: nodesData,
  edges,
  selected,
  selectNode,
  className,
  height,
  width,
}) => {
  const containerRef = useRef<SVGSVGElement>(null);

  const svgRef = useRef<SchemeSVGSelectionType>();

  const edgesData = useMemo<ISVGSchemeEdge[]>(
    () =>
      edges
        .map((e) => ({
          source: nodesData.find((n) => n.id === e[0]),
          target: nodesData.find((n) => n.id === e[1]),
        }))
        .filter((e): e is ISVGSchemeEdge => !!e.source && !!e.target),
    [edges, nodesData]
  );

  useEffect(() => {
    const divContainer = containerRef.current;

    if (divContainer) {
      svgRef.current = d3.select<SVGSVGElement, unknown>(divContainer);

      const defs = svgRef.current.append("defs");

      defs
        .append("marker")
        .attr("id", "marker-end" + id)
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 5)
        .attr("refY", 5)
        .attr("marke-width", 6)
        .attr("marker-height", 6)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z");

      defs
        .append("marker")
        .attr("id", "marker-start" + id)
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 5)
        .attr("refY", 5)
        .attr("marker-width", 60)
        .attr("marker-height", 60)
        .append("circle")
        .attr("cx", 5)
        .attr("cy", 5)
        .attr("r", 5);

      svgRef.current?.append("g");
      return () => {
        svgRef.current?.selectAll("*").remove();
      };
    }
  }, [id]);

  // --- zoom ---
  useEffect(() => {
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      // .extent([
      //   [-300, -300],
      //   [300, 300],
      // ])
      .scaleExtent([0.5, 2]) // TODO: scale extent
      .on("zoom", ({ transform }) => {
        svgRef.current?.select("g").attr("transform", transform);
      });
    svgRef.current?.call(zoom);

    // const resetZoom = () =>
    //   svgRef.current
    //     ?.transition()
    //     .duration(750)
    //     .call(zoom.transform, d3.zoomIdentity);
    return () => {
      svgRef.current?.call(d3.zoom<SVGSVGElement, unknown>().on("zoom", null));
    };
  }, [id]);

  // --- draw ---
  useEffect(() => {
    if (!svgRef.current) return;
    const nodesGroup = svgRef.current?.select("g").append("g");

    const nodes = nodesGroup
      .selectAll<SVGCircleElement, unknown>("*")
      .data(nodesData)
      .join("g")
      .attr("class", scss.node)
      .attr("transform", (node) => "translate(" + [node.x, node.y] + ")");

    nodes.append("rect").attr("width", NODE_WIDTH).attr("height", NODE_HEIGHT);
    nodes
      .append("text")
      .text((n) => n?.name || n.id)
      .attr("transform", "translate(10, 30)");

    nodes.on("click", (_, node) => selectNode(node));

    let edgesSource: SchemeEdgeSVGSelectionType | undefined = undefined;
    let edgesTarget: SchemeEdgeSVGSelectionType | undefined = undefined;

    nodes?.call(
      d3
        .drag<SVGGElement, ISchemeNode>()
        .on("start", (_, n) => {
          edgesSource = svgRef.current
            ?.selectAll<SVGLineElement, ISVGSchemeEdge>("." + scss.line)
            .filter((t) => t.source.id === n.id);
          edgesTarget = svgRef.current
            ?.selectAll<SVGLineElement, ISVGSchemeEdge>("." + scss.line)
            .filter((t) => t.target.id === n.id);
        })
        .on("drag", function dragged(event) {
          const x = event.x + event.dx;
          const y = event.y + event.dy;
          d3.select(this).attr("transform", "translate(" + [x, y] + ")");

          edgesSource
            ?.attr("x1", x + NODE_WIDTH)
            .attr("y1", y + NODE_HEIGHT / 2);

          edgesTarget?.attr("x2", x).attr("y2", y + NODE_HEIGHT / 2);
        })
        .on("end", (event, node) => {
          node.x = event.x;
          node.y = event.y;
          edgesTarget = undefined;
          edgesSource = undefined;
        })
    );

    return () => {
      nodesGroup.remove();
    };
  }, [nodesData, selectNode]);

  useEffect(() => {
    if (!svgRef.current) return;
    const edgesGroup = svgRef.current?.select("g").append("g");

    edgesGroup
      .selectAll<SVGLineElement, unknown>("*")
      .data(edgesData)
      .join("line")
      .classed(scss.line, true)
      .attr("x1", (e) => e.source.x + NODE_WIDTH)
      .attr("x2", (e) => e.target.x)
      .attr("y1", (e) => e.source.y + NODE_HEIGHT / 2)
      .attr("y2", (e) => e.target.y + NODE_HEIGHT / 2)
      .attr("marker-start", `url(#${"marker-start" + id})`)
      .attr("marker-end", `url(#${"marker-end" + id})`);
    // .attr("marker-end",  "url(#arrow)")
  }, [edgesData, id]);

  useEffect(() => {
    svgRef.current
      ?.selectAll<SVGElement, ISchemeNode>("." + scss.node)
      .classed(scss.active, (n) => n.id === selected?.id);
  }, [selected?.id]);

  return (
    <svg
      id={id}
      ref={containerRef}
      className={`${className || ""} ${scss.root}`}
      width={width}
      height={height}
    />
  );
};

export default memo(Scheme);
