declare namespace NetworkModuleScssNamespace {
  export interface INetworkModuleScss {
    button: string;
    buttons: string;
    root: string;
  }
}

declare const NetworkModuleScssModule: NetworkModuleScssNamespace.INetworkModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NetworkModuleScssNamespace.INetworkModuleScss;
};

export = NetworkModuleScssModule;
