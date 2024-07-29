import scss from "./scheme.module.scss";

import * as d3 from "d3";
import { FC, memo, useEffect, useRef } from "react";

import {
  ISchemeNode,
  ISchemeEdge,
  SchemeEdgeSVGSelectionType,
  SchemeSVGSelectionType,
  SCHEME_EDGE_TYPES,
  SchemeEdgeType,
} from "./utils/types";

export const NODE_WIDTH = 120;
export const NODE_HEIGHT = 40;
export const NODE_STEP_X = 160;
export const NODE_STEP_Y = 60;
export const OFFFSET_X = 20;
export const OFFFSET_Y = 100;

const LINE_CLASS = "line";

const getEdgeColor = (type: SchemeEdgeType): string | null => {
  switch (type) {
    case "1":
      return "var(--cl-edge-1)";
    case "2":
      return "var(--cl-edge-2)";
    case "3":
      return "var(--cl-edge-3)";
    case "4":
      return "var(--cl-edge-4)";

    default:
      return null;
  }
};

const getEdgeStrokeDasharray = (type: SchemeEdgeType): string | null => {
  switch (type) {
    // case "1":
    //   return "var(--cl-edge-1)";
    // case "2":
    //   return "var(--cl-edge-2)";
    case "2":
      return "10 2";
    case "4":
      return "2 4";

    default:
      return null;
  }
};

const createMarkerEnd = (
  defs: d3.Selection<SVGDefsElement, unknown, null, undefined>,
  id: string,
  color: string | null
) =>
  defs
    .append("marker")
    .attr("id", id)
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 8)
    .attr("refY", 4)
    .attr("marker-units", "userSpaceOnUse")
    .attr("marke-width", 10)
    .attr("marker-height", 10)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", color);

const createMarkerStart = (
  defs: d3.Selection<SVGDefsElement, unknown, null, undefined>,
  id: string,
  color: string | null
) =>
  defs
    .append("marker")
    .attr("id", id)
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 5)
    .attr("refY", 5)
    .attr("marker-width", 60)
    .attr("marker-height", 60)
    .append("circle")
    .attr("cx", 5)
    .attr("cy", 5)
    .attr("r", 5)
    .attr("fill", color);

type PointType = [number, number];
const getPath = (edge: ISchemeEdge): string | null => {
  const start: PointType = [
    edge.source?.x || 0,
    (edge.source?.y || 0) + NODE_HEIGHT / 2,
  ];

  const end: PointType = [
    edge.target?.x || 0,
    (edge.target?.y || 0) + NODE_HEIGHT / 2,
  ];

  if (start[0] <= end[0]) {
    start[0] += NODE_WIDTH;
  } else {
    end[0] += NODE_WIDTH;
  }

  // [source, target]
  const points: [number, number][] = [start, end];

  const middle: PointType = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2];

  if (edge.type === "3")
    points.splice(
      1,
      0,
      [middle[0] + 5, middle[1] - 5],
      [middle[0] - 5, middle[1] + 5]
    );

  return d3.line().curve(d3.curveCardinal)(points);
};

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
  edges: edgesData,
  selected,
  selectNode,
  className,
  height,
  width,
}) => {
  const containerRef = useRef<SVGSVGElement>(null);

  const svgRef = useRef<SchemeSVGSelectionType>();

  useEffect(() => {
    const divContainer = containerRef.current;

    if (divContainer) {
      svgRef.current = d3.select<SVGSVGElement, unknown>(divContainer);

      const defs = svgRef.current.append("defs");

      SCHEME_EDGE_TYPES.forEach((type) => {
        createMarkerEnd(defs, "marker-end" + type + id, getEdgeColor(type));
        createMarkerStart(defs, "marker-start" + type + id, getEdgeColor(type));
      });

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
      .attr("transform", "translate(10, 25)");

    nodes.on("click", (_, node) => selectNode(node));

    let edgesSource: SchemeEdgeSVGSelectionType | undefined = undefined;
    let edgesTarget: SchemeEdgeSVGSelectionType | undefined = undefined;

    const layout = (x: number, y: number, node: SVGGElement) => {
      d3.select(node).attr("transform", "translate(" + [x, y] + ")");
      edgesSource?.attr("d", (e) =>
        getPath({
          ...e,
          source: e.source ? { ...e.source, x, y } : undefined,
        })
      );
      edgesTarget?.attr("d", (e) =>
        getPath({
          ...e,
          target: e.target ? { ...e.target, x, y } : undefined,
        })
      );
    };

    nodes?.call(
      d3
        .drag<SVGGElement, ISchemeNode>()
        .on("start", (_, n) => {
          edgesSource = svgRef.current
            ?.selectAll<SVGPathElement, ISchemeEdge>("." + LINE_CLASS)
            .filter((t) => t.source?.id === n.id);
          edgesTarget = svgRef.current
            ?.selectAll<SVGPathElement, ISchemeEdge>("." + LINE_CLASS)
            .filter((t) => t.target?.id === n.id);
        })
        .on("drag", function dragged(event) {
          layout(event.x + event.dx, event.y + event.dy, this);
        })
        .on("end", function dragend(event, node) {
          const x =
            Math.round((event.x - OFFFSET_X) / (NODE_WIDTH + NODE_STEP_X)) *
              (NODE_WIDTH + NODE_STEP_X) +
            OFFFSET_X;
          const y =
            Math.round((event.y - OFFFSET_Y) / (NODE_HEIGHT + NODE_STEP_Y)) *
              (NODE_HEIGHT + NODE_STEP_Y) +
            OFFFSET_Y;

          node.x = x;
          node.y = y;

          layout(x, y, this);

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
      .selectAll<SVGElement, unknown>("*")
      .data(edgesData.filter((e) => !!e.source && !!e.target))
      .join("path")
      .classed(LINE_CLASS, true)
      .attr("stroke", (e) => getEdgeColor(e.type))
      .attr("stroke-dasharray", (e) => getEdgeStrokeDasharray(e.type))
      .attr("stroke-width", 4)
      .attr("fill", "none")
      .attr("d", getPath)
      .attr("marker-start", (e) => `url(#${"marker-start" + e.type + id})`)
      .attr("marker-end", (e) => `url(#${"marker-end" + e.type + id})`);

    return () => {
      edgesGroup.remove();
    };
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
