import * as d3 from "d3";
import { useEffect } from "react";
import { INetWorkZoomOptions, NetworkSVGSelectionType } from "../utils/types";

export const useNetworkZoom = ({
  svg,
  zoomed,
  resetZoom,
  options,
}: {
  svg: NetworkSVGSelectionType | undefined;
  zoomed: boolean;
  resetZoom: React.MutableRefObject<(() => void) | undefined>;
  options: INetWorkZoomOptions;
}) => {
  useEffect(() => {
    if (svg && zoomed) {
      const zoom = d3
        .zoom<SVGSVGElement, unknown>()
        // .extent([
        //   [-300, -300],
        //   [300, 300],
        // ])
        .scaleExtent([options.zoomMin, options.zoomMax])
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
  }, [options.zoomMax, options.zoomMin, resetZoom, svg, zoomed]);
};
