import { INetworkLink, INetworkLinksOptions } from "./types";

export const layoutLinks = ({
  linksGroup,
  options,
}: {
  linksGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
  options: INetworkLinksOptions;
}) => {
  const links = linksGroup
    .selectAll<SVGLineElement, INetworkLink>("line")
    .attr("stroke", options.linkColor)
    .attr(
      "stroke-width",
      options.linkWidth
      // typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null
    )
    .attr("stroke-linecap", options.linkLinecap);

  if (options.linkOpacity) links.attr("stroke-opacity", options.linkOpacity);
};
