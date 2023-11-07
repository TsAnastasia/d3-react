declare namespace NetworkPageModuleScssNamespace {
  export interface INetworkPageModuleScss {
    chart: string;
    subtitle: string;
  }
}

declare const NetworkPageModuleScssModule: NetworkPageModuleScssNamespace.INetworkPageModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NetworkPageModuleScssNamespace.INetworkPageModuleScss;
};

export = NetworkPageModuleScssModule;
