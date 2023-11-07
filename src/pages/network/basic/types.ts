import { SimulationLinkDatum, SimulationNodeDatum } from "d3";

export type NodeId = number;

export interface INetworkNode extends SimulationNodeDatum {
  id: NodeId;
  name: string;
  r?: number;
}

export type INetworkLink = SimulationLinkDatum<INetworkNode>;
