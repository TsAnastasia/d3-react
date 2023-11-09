import { INetworkLink, NetworkLinkSelectionType } from "./types";

export const drawLinks = ({
  linksGroup,
  linksData,
  classes,
}: {
  linksGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
  linksData: INetworkLink[];
  classes: Record<"link", string>;
}): NetworkLinkSelectionType =>
  linksGroup
    .selectAll<SVGLineElement, unknown>("line")
    .data(linksData)
    .join("line")
    .attr("class", classes.link)
    .attr("marker-end", "url(#arrow)");
