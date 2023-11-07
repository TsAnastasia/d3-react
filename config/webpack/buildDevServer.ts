import type { Configuration as DEvServerConfiguration } from "webpack-dev-server";

import { IBuildOptions } from "./types";

export const buildDevServer = (
  options: IBuildOptions
): DEvServerConfiguration => ({
  port: options.port,
  open: true,
  hot: true,
  compress: true,
  historyApiFallback: true,
});
