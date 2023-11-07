declare namespace ErrorPageModuleScssNamespace {
  export interface IErrorPageModuleScss {
    btn: string;
    root: string;
    text: string;
  }
}

declare const ErrorPageModuleScssModule: ErrorPageModuleScssNamespace.IErrorPageModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ErrorPageModuleScssNamespace.IErrorPageModuleScss;
};

export = ErrorPageModuleScssModule;
