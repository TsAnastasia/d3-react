export type SchemeSVGSelectionType = d3.Selection<
  SVGSVGElement,
  unknown,
  null,
  undefined
>;

export type SchemeEdgeSVGSelectionType = d3.Selection<
  SVGLineElement,
  ISVGSchemeEdge,
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

export type ISchemeEdge = [string, string];

export type ISVGSchemeEdge = Record<"source" | "target", ISchemeNode>;
