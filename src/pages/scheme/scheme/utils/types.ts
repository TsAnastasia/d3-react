export type SchemeSVGSelectionType = d3.Selection<
  SVGSVGElement,
  unknown,
  null,
  undefined
>;

export type SchemeEdgeSVGSelectionType = d3.Selection<
  SVGLineElement,
  ISchemeEdge,
  SVGGElement,
  unknown
>;

export interface ISchemeNode {
  id: string;
  name?: string;
  // index?: number | undefined;
  x: number;
  y: number;
}

export const SCHEME_EDGE_TYPES = ["1", "2", "3", "4"] as const;

export type SchemeEdgeType = (typeof SCHEME_EDGE_TYPES)[number];
export type ISchemeDataEdge =
  | [string, string, SchemeEdgeType]
  | [string, string];

export interface ISchemeEdge {
  id: string;
  source: ISchemeNode | undefined;
  target: ISchemeNode | undefined;
  type: SchemeEdgeType;
}
