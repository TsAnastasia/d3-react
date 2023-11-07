import { ResolveOptions } from "webpack";

export const buildResolvers = (): ResolveOptions => ({
  extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"],
  modules: ["node_modules"],
  mainFiles: ["index"],
});
