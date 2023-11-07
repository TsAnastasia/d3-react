export type BuildMode = "development" | "production";

export interface IBuildPaths {
  entry: string;
  build: string;
  html: string;
  src: string;
  favicon?: string;
  env: string;
}

export interface IBuildEnv {
  mode?: BuildMode;
  port?: number;
  envType?: BuildMode;
  analize?: boolean;
}

export interface IBuildOptions extends Required<Omit<IBuildEnv, "envType">> {
  mode: BuildMode;
  port: number;
  isDev: boolean;
  paths: IBuildPaths;
}
