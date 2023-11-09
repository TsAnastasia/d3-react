import { NodeIdType } from "../../force/types";

export type NetworkNodeIdType = string;

export interface INetworkNode {
  id: NetworkNodeIdType;
  index?: number | undefined;
  x?: number;
  y?: number;
  r?: number | undefined;
}

export interface INetworkLink {
  source: NodeIdType | INetworkNode;
  target: NodeIdType | INetworkNode;
}

export interface INetworkProps {
  data: {
    nodes: INetworkNode[];
    links: INetworkLink[];
  };

  className?: string;
  onNodeClick?: (node: INetworkNode | undefined) => void;
  zoomed?: boolean;

  options?: Partial<INetworkNodesOptions & INetworkLinksOptions>;
}

type GetValueByNode<T = string> = T | ((node: INetworkNode) => T);
export interface INetworkNodesOptions {
  nodeColor: GetValueByNode; // color
  nodeStrokeColor: GetValueByNode; // color
  nodeStrokeWidth: GetValueByNode<number>; // >= 0
  nodeStrokeOpacity: GetValueByNode<number> | undefined; // [0, 1]
  nodeRadius: GetValueByNode<number>; // > 0
}

type GetValueByLink<T = string> = T | ((node: INetworkLink) => T);
export interface INetworkLinksOptions {
  linkColor: GetValueByLink; // color
  linkWidth: GetValueByLink<number>; // >= 0
  linkOpacity: GetValueByLink<number> | undefined; // [0, 1]
  linkLinecap: GetValueByLink<"butt" | "round" | "square">; // > 0
}

export type NetworkSVGSelectionType = d3.Selection<
  SVGSVGElement,
  unknown,
  null,
  undefined
>;

export type NetworkNodeSelectionType = d3.Selection<
  SVGCircleElement,
  INetworkNode,
  SVGGElement,
  unknown
>;

export type NetworkLinkSelectionType = d3.Selection<
  SVGLineElement,
  INetworkLink,
  SVGGElement,
  unknown
>;
