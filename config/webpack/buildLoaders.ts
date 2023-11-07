import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { RuleSetRule } from "webpack";
import { IBuildOptions } from "./types";

export const buildLoders = ({ isDev }: IBuildOptions): RuleSetRule[] => {
  const typescriptLoader = {
    test: /\.(ts|js)x?$/,
    exclude: /node_modules/,
    use: [{ loader: "babel-loader" }],
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      "@teamsupercell/typings-for-css-modules-loader",
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: (resourcePath: string) =>
              resourcePath.endsWith(".module.scss"),
            localIdentName: isDev
              ? "[path][name]__[local]--[hash:base64:4]"
              : "[hash:base64:8]",
          },
        },
      },
      {
        loader: "resolve-url-loader",
        options: {
          sourceMap: true,
          debug: true,
          silent: true,
        },
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
        },
      },
    ],
  };

  const imagesLoader = {
    test: /\.(ico|jpg|jpeg|png|gif|svg)(\?.*)?$/,
    type: "asset/resource",
  };

  const fontsLoader = {
    test: /\.(eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
    type: "asset/resource",
    generator: {
      filename: "fonts/[hash][ext][query]",
    },
  };

  return [typescriptLoader, scssLoader, imagesLoader, fontsLoader];
};
