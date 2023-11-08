import scss from "./network.module.scss";

import { FC, memo, useEffect, useRef } from "react";
import * as d3 from "d3";

import ZoomResetIcon from "../../../assets/icons/ZoomReset";
import { cl } from "../../../assets/utils/libs/classNames";

import {
  INetworkLink,
  INetworkNode,
  INetworkProps,
  INetworkSelectionRef,
} from "./utils/types";

const linkStroke = "#999";
const linkStrokeOpacity = 0.6;
const linkStrokeWidth: ((link: INetworkLink) => number) | number = 1.5;
const linkStrokeLinecap = "round";

const markerColor = linkStroke;

const nodeStroke = "#000";
const nodeStrokeWidth = 1;
const nodeStrokeOpacity = 1;
const nodeRadius = 20;

const forceSimulationStrength = -1200;

const Network: FC<INetworkProps> = ({
  data,

  className,
  onNodeClick,
  zoomed = false,

  options: { nodeColor = "var(--color-bg)" } = {},
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const resetZoom = useRef<() => void>();

  const selectionRef = useRef<INetworkSelectionRef>({});

  useEffect(() => {
    const divContainer = ref.current;

    if (divContainer) {
      // size
      const width = ref.current?.clientWidth || 0;
      const height = ref.current?.clientHeight || 0;
      // data
      const nodes = data.nodes.map((n) => ({ ...n }));
      const links = data.links.map((l) => ({ ...l }));

      const ticked = () => {
        link
          .attr("x1", (l) => (typeof l.source === "object" && l.source.x) || 0)
          .attr("y1", (l) => (typeof l.source === "object" && l.source.y) || 0)
          .attr("x2", (l) => (typeof l.target === "object" && l.target.x) || 0)
          .attr("y2", (l) => (typeof l.target === "object" && l.target.y) || 0);

        node.attr("cx", (n) => n.x || 0).attr("cy", (n) => n.y || 0);
      };

      // const simulation =

      d3.forceSimulation<INetworkNode>(nodes)
        .force(
          "link",
          d3.forceLink<INetworkNode, INetworkLink>(links).id((n) => n.id)
        )
        .force("charge", d3.forceManyBody().strength(forceSimulationStrength))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .on("tick", ticked);

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

      const node = container
        .append("g")
        .attr("stroke", nodeStroke)
        .attr("stroke-opacity", nodeStrokeOpacity)
        .attr("stroke-width", nodeStrokeWidth)
        .selectAll<SVGCircleElement, INetworkNode>("circle")
        .data(nodes)
        .join("circle")
        .attr("r", nodeRadius);
      selectionRef.current.nodes = node;
    }
  }, [data.nodes, data.links]);

  // color nodes
  useEffect(() => {
    selectionRef.current.nodes?.attr("fill", nodeColor);
  }, [nodeColor]);

  // click node

  useEffect(() => {
    if (onNodeClick)
      selectionRef.current.nodes?.on("click", (_, node) =>
        onNodeClick(data.nodes.find((n) => n.id === node.id))
      );
  }, [onNodeClick, data.nodes]);

  return (
    <div
      ref={ref}
      className={cl(scss.root, className)}
      style={{ position: "relative" }}
    >
      <div className={scss.buttons}>
        <button
          type="button"
          className={scss.button}
          disabled={!zoomed}
          onClick={() => resetZoom.current && resetZoom.current()}
        >
          <ZoomResetIcon />
        </button>
      </div>
    </div>
  );
};

export default memo(Network);
