import * as d3 from "d3";
import { MutableRefObject, useEffect } from "react";
import { selectNodes } from "../Network";
import { INetworkNode, NetworkSVGSelectionType } from "../utils/types";

export const useNetworkDrag = ({
  svg,
  draggable,
  simalationRef,
}: {
  svg: NetworkSVGSelectionType | undefined;
  draggable: boolean;
  simalationRef: MutableRefObject<
    d3.Simulation<INetworkNode, undefined> | undefined
  >;
}) => {
  useEffect(() => {
    if (svg && draggable) {
      selectNodes(svg)?.call(
        d3
          .drag<SVGCircleElement, INetworkNode>()
          .on("start", (event) => {
            if (!event.active)
              simalationRef.current?.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
          })
          .on("drag", (event) => {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
          })
          .on("end", (event) => {
            if (!event.active) simalationRef.current?.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
          })
      );
    }

    return () => {
      selectNodes(svg)?.call(
        d3
          .drag<SVGCircleElement, INetworkNode>()
          .on("start", null)
          .on("drag", null)
          .on("end", null)
      );
    };
  }, [svg, draggable, simalationRef]);
};
