export type NetworkNodeIdType = string;

export interface INetworkNode {
  id: NetworkNodeIdType;
  index?: number | undefined;
  x?: number;
  y?: number;
  r?: number | undefined;
}

export interface INetworkLink {
  source: NetworkNodeIdType | INetworkNode;
  target: NetworkNodeIdType | INetworkNode;
}

export interface INetworkProps {
  data: INetworkData;

  className?: string;
  onNodeClick?: (node: INetworkNode | undefined) => void;
  zoomed?: boolean;
  draggable?: boolean;

  options?: Partial<
    INetworkNodesOptions & INetworkLinksOptions & INetWorkZoomOptions
  >;
}

export interface INetworkData {
  nodes: INetworkNode[];
  links: INetworkLink[];
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

export interface INetWorkZoomOptions {
  zoomMin: number;
  zoomMax: number;
}

export type NetworkSVGSelectionType = d3.Selection<
  SVGSVGElement,
  unknown,
  null,
  undefined
>;

export type NetworkNodeSelectionType = d3.Selection<
  SVGGElement,
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
