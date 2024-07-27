export const AppRoutes = {
  HOME: "/",
  GANTT: "/gantt",
  SCATTER: "/scatter",
  HISTOGRAMM: "/histogramm",
  HEATMAP: "/heatmap",
  NETWORK: "/network",
  SCHEME: "/scheme",
};

export const APP_PAGES: {
  key: keyof typeof AppRoutes;
  name?: string;
  inprogress?: boolean;
  description?: string;
}[] = [
  {
    key: "GANTT",
    name: "Gantt",
    inprogress: true,
    description: "Gantt graph from STAIRS project.",
  },
  { key: "SCATTER", inprogress: true },
  { key: "HISTOGRAMM", inprogress: true },
  { key: "HEATMAP", inprogress: true },
  { key: "NETWORK", name: "Network" },
  { key: "SCHEME", name: "Scheme" },
];
