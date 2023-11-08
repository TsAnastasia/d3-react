import { NodeIdType } from "../../force/types";

export type NetworkNodeIdType = string;

export interface INetworkNode {
  id: NetworkNodeIdType;
  index?: number | undefined;
  x?: number;
  y?: number;
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

  options?: {
    nodeColor?: string | ((node: INetworkNode) => string);
  };
}

export interface INetworkSelectionRef {
  nodes?: d3.Selection<SVGCircleElement, INetworkNode, SVGGElement, unknown>;
}
