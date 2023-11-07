import { Configuration } from "webpack";

import { buildDevServer } from "./buildDevServer";
import { buildLoders } from "./buildLoaders";
import { buildOptimization } from "./buildOptimization";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { IBuildOptions } from "./types";

export const buildWebpackConfig = (options: IBuildOptions): Configuration => ({
  mode: options.mode,
  entry: options.paths.entry,
  output: {
    path: options.paths.build,
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].chunk.js",
    publicPath: "/",
    clean: true,
  },
  resolve: buildResolvers(),
  module: { rules: buildLoders(options) },
  plugins: buildPlugins(options),
  devtool: options.isDev ? "cheap-module-source-map" : "source-map",
  devServer: options.isDev ? buildDevServer(options) : undefined,
  optimization: options.isDev ? {} : buildOptimization(),
});
