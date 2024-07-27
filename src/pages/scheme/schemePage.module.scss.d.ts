declare namespace SchemePageModuleScssNamespace {
  export interface ISchemePageModuleScss {
    buttons: string;
    scheme: string;
    section: string;
  }
}

declare const SchemePageModuleScssModule: SchemePageModuleScssNamespace.ISchemePageModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SchemePageModuleScssNamespace.ISchemePageModuleScss;
};

export = SchemePageModuleScssModule;
