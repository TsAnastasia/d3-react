import { CleanWebpackPlugin } from "clean-webpack-plugin";
import Dotenv from "dotenv-webpack";
import ESLintPlugin from "eslint-webpack-plugin";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack, { WebpackPluginInstance } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import { IBuildOptions } from "./types";

export const buildPlugins = ({
  paths,
  isDev,
  analize,
}: IBuildOptions): WebpackPluginInstance[] => {
  const plugins: WebpackPluginInstance[] = [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new Dotenv({ path: paths.env }),
    new HTMLWebpackPlugin({
      template: paths.html,
      favicon: paths.favicon,
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),
  ];

  if (analize) {
    plugins.push(new BundleAnalyzerPlugin());
  }
  if (isDev) {
    plugins.push(
      new ESLintPlugin({
        extensions: ["js", "jsx", "ts", "tsx"],
      })
    );
  }

  return plugins;
};
