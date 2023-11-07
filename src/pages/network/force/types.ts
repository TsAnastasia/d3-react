export type NodeIdType = string;

export interface INode {
  id: NodeIdType;
  index?: number | undefined;
  x?: number | undefined;
  y?: number | undefined;
}

export interface ILink {
  source: NodeIdType | INode;
  target: NodeIdType | INode;
}
