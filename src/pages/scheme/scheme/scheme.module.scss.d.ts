declare namespace SchemeModuleScssNamespace {
  export interface ISchemeModuleScss {
    active: string;
    line: string;
    node: string;
    root: string;
  }
}

declare const SchemeModuleScssModule: SchemeModuleScssNamespace.ISchemeModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SchemeModuleScssNamespace.ISchemeModuleScss;
};

export = SchemeModuleScssModule;
