import * as d3 from "d3";
import { useEffect } from "react";
import { NetworkSVGSelectionType } from "../utils/types";

export const useNetworkZoom = ({
  svg,
  zoomed,
  resetZoom,
}: {
  svg: NetworkSVGSelectionType | undefined;
  zoomed: boolean;
  resetZoom: React.MutableRefObject<(() => void) | undefined>;
}) => {
  useEffect(() => {
    if (svg && zoomed) {
      const zoom = d3
        .zoom<SVGSVGElement, unknown>()
        .extent([
          [-300, -300],
          [300, 300],
        ])
        .scaleExtent([0.5, 8])
        .on("zoom", ({ transform }) => {
          svg?.select("g").attr("transform", transform);
        });
      svg?.call(zoom);
      resetZoom.current = () => {
        svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
      };
    }

    return () => {
      if (resetZoom.current) resetZoom.current();
      resetZoom.current = undefined;

      svg?.call(d3.zoom<SVGSVGElement, unknown>().on("zoom", null));
    };
  }, [resetZoom, svg, zoomed]);
};
