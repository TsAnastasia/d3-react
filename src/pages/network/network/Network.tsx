import scss from "./network.module.scss";

import { FC, memo, useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import ZoomResetIcon from "../../../assets/icons/ZoomReset";
import { cl } from "../../../assets/utils/libs/classNames";

import {
  INetworkNode,
  INetworkProps,
  NetworkSVGSelectionType,
} from "./utils/types";
import { layoutNodes } from "./utils/layoutNodes";
import { drawNodes } from "./utils/drawNodes";
import { drawLinks } from "./utils/drawLinks";
import { simulation } from "./utils/simulation";
import { layoutLinks } from "./utils/layoutLinks";

const linkStroke = "#999";

const DEFAULT_LINK_COLOR = "#999";
const DEFAULT_LINK_WIDTH = 1.5;
const DEFAULT_LINK_LINECAP = "round";

const markerColor = linkStroke;

const DEFAULT_NODE_COLOR = "var(--color-bg)";
const DEFAULT_NODE_STROKE_COLOR = "var(--color-text)";
const DEFAULT_NODE_STROKE_WIDTH = 1;
const DEFAULT_NODE_RADIUS = 20;

const Network: FC<INetworkProps> = ({
  data,

  className,
  onNodeClick,
  zoomed = false,

  options: {
    nodeColor = DEFAULT_NODE_COLOR,
    nodeStrokeColor = DEFAULT_NODE_STROKE_COLOR,
    nodeStrokeOpacity,
    nodeStrokeWidth = DEFAULT_NODE_STROKE_WIDTH,
    nodeRadius = (n: INetworkNode) => n.r || DEFAULT_NODE_RADIUS,

    linkColor = DEFAULT_LINK_COLOR,
    linkWidth = DEFAULT_LINK_WIDTH,
    linkOpacity,
    linkLinecap = DEFAULT_LINK_LINECAP,
  } = {},
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const resetZoom = useRef<() => void>();

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
        linksGroup: container.append("g").attr("class", "links"),
        linksData: linksD,
        classes: { link: "link" },
      });

      const nodes = drawNodes({
        nodesGroup: container.append("g").attr("class", "nodes"),
        nodesData: nodesD,
        classes: { node: "node" },
      });

      // const simulation =
      simulation({ linksData: linksD, nodesData: nodesD, links, nodes });

      setSvg(svg);

      return () => {
        svg.remove();
      };
    }
  }, [data.nodes, data.links]);

  useEffect(() => {
    if (onNodeClick)
      svg
        ?.selectAll<SVGCircleElement, INetworkNode>("circle")
        ?.on("click", (_, node) =>
          onNodeClick(data.nodes.find((n) => n.id === node.id))
        );
  }, [onNodeClick, data.nodes, svg]);

  // layout nodes
  useEffect(() => {
    const nodesGroup = svg?.select<SVGGElement>(".nodes");
    nodesGroup &&
      layoutNodes({
        nodesGroup,
        classes: { node: "node" },
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
    const linksGroup = svg?.select<SVGGElement>(".links");
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
