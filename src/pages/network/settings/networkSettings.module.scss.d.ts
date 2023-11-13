declare namespace NetworkSettingsModuleScssNamespace {
  export interface INetworkSettingsModuleScss {
    boolean: string;
    root: string;
    title: string;
  }
}

declare const NetworkSettingsModuleScssModule: NetworkSettingsModuleScssNamespace.INetworkSettingsModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NetworkSettingsModuleScssNamespace.INetworkSettingsModuleScss;
};

export = NetworkSettingsModuleScssModule;
