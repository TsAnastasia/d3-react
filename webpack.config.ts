import webpack from "webpack";
import path from "path";
import { IBuildEnv } from "./config/webpack/types";
import { buildWebpackConfig } from "./config/webpack/buildWebpackConfig";

const resolvePath = (...args: string[]) => path.resolve(__dirname, ...args);

export default ({
  mode = "development",
  port = 3000,
  envType = mode,
  analize = false,
}: IBuildEnv): webpack.Configuration =>
  buildWebpackConfig({
    mode,
    port,
    isDev: mode === "development",
    analize,
    paths: {
      entry: resolvePath("src", "index.tsx"),
      build: resolvePath("build"),
      html: resolvePath("public", "index.html"),
      // favicon: resolvePath("public", "favicon.ico"),
      src: resolvePath("src"),
      env: resolvePath(`.env.${envType}`),
    },
  });
