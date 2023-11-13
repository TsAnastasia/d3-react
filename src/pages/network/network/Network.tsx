import scss from "./network.module.scss";

import * as d3 from "d3";
import { FC, memo, useEffect, useRef, useState } from "react";

import ZoomResetIcon from "../../../assets/icons/ZoomReset";
import { cl } from "../../../assets/utils/libs/classNames";

import { useNetworkDrag } from "./hooks/useDrag";
import { useNetworkZoom } from "./hooks/useZoom";
import { drawLinks } from "./utils/drawLinks";
import { drawNodes } from "./utils/drawNodes";
import { layoutLinks } from "./utils/layoutLinks";
import { layoutNodes } from "./utils/layoutNodes";
import { simulation } from "./utils/simulation";
import {
  INetworkNode,
  INetworkProps,
  NetworkNodeSelectionType,
  NetworkSVGSelectionType,
} from "./utils/types";
import { NETWORK_CLASSES } from "./utils/constants";

// TODO
const linkStroke = "#999";
const markerColor = linkStroke;
const DEFAULT_NODE_RADIUS = 20;

export const selectNodes = (
  svg: NetworkSVGSelectionType | undefined
): NetworkNodeSelectionType | undefined =>
  svg?.selectAll<SVGGElement, INetworkNode>("." + NETWORK_CLASSES.NODE);

const Network: FC<INetworkProps> = ({
  data,

  className,
  onNodeClick,
  zoomed = false,
  draggable = false,

  options: {
    nodeColor = "var(--color-bg)",
    nodeStrokeColor = "var(--color-text)",
    nodeStrokeOpacity,
    nodeStrokeWidth = 1,
    nodeRadius = (n: INetworkNode) => n.r || DEFAULT_NODE_RADIUS,

    linkColor = "var(--color-primary)",
    linkWidth = 1.5,
    linkOpacity,
    linkLinecap = "round",

    zoomMin = 0,
    zoomMax = 10,
  } = {},
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const resetZoom = useRef<() => void>();
  const simalationRef = useRef<d3.Simulation<INetworkNode, undefined>>();
  const [svg, setSvg] = useState<NetworkSVGSelectionType>();

  useEffect(() => {
    const divContainer = ref.current;

    if (divContainer) {
      // size
      const width = ref.current?.clientWidth || 0;
      const height = ref.current?.clientHeight || 0;
      // data
      const nodesD = data.nodes.map((n) => ({ ...n }));
      const linksD = data.links.map((l) => ({ ...l }));

      const svg = d3
        .select(divContainer)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height]);

      svg
        .append("svg:defs")
        .selectAll("marker")
        .data(["arrow"])
        .enter()
        .append("svg:marker")
        .attr("id", String)
        .attr("viewBox", "0 0 10 10")
        .attr("fill", markerColor)
        // .attr("refX", 10 + 0.8 * nodeRadius)
        .attr("refX", 10 + 0.8 * DEFAULT_NODE_RADIUS) //TODO
        .attr("refY", 5)
        .attr("markerWidth", 8)
        .attr("markerHeight", 8)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z");

      const container = svg.append("g");

      const links = drawLinks({
        linksGroup: container.append("g").attr("class", NETWORK_CLASSES.LINKS),
        linksData: linksD,
        classes: { link: NETWORK_CLASSES.LINK },
      });

      const nodes = drawNodes({
        nodesGroup: container.append("g").attr("class", NETWORK_CLASSES.NODES),
        nodesData: nodesD,
        classes: { node: NETWORK_CLASSES.NODE },
      });

      simalationRef.current = simulation({
        linksData: linksD,
        nodesData: nodesD,
        links,
        nodes,
      });

      setSvg(svg);

      return () => {
        svg.remove();
      };
    }
  }, [data.nodes, data.links]);

  useEffect(() => {
    if (onNodeClick)
      selectNodes(svg)?.on("click", (_, node) =>
        onNodeClick(data.nodes.find((n) => n.id === node.id))
      );
  }, [onNodeClick, data.nodes, svg]);

  // layout nodes
  useEffect(() => {
    const nodesGroup = svg?.select<SVGGElement>("." + NETWORK_CLASSES.NODES);
    nodesGroup &&
      layoutNodes({
        nodesGroup,
        classes: { node: NETWORK_CLASSES.NODE },
        options: {
          nodeColor,
          nodeStrokeColor,
          nodeStrokeWidth,
          nodeStrokeOpacity,
          nodeRadius,
        },
      });
  }, [
    nodeColor,
    nodeRadius,
    nodeStrokeColor,
    nodeStrokeOpacity,
    nodeStrokeWidth,
    svg,
  ]);

  // layout links
  useEffect(() => {
    const linksGroup = svg?.select<SVGGElement>("." + NETWORK_CLASSES.LINKS);
    linksGroup &&
      layoutLinks({
        linksGroup,
        options: {
          linkColor,
          linkWidth,
          linkOpacity,
          linkLinecap,
        },
      });
  }, [linkColor, linkLinecap, linkOpacity, linkWidth, svg]);

  useNetworkZoom({ svg, zoomed, resetZoom, options: { zoomMin, zoomMax } });
  useNetworkDrag({ svg, draggable, simalationRef });

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
