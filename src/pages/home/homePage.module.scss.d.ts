declare namespace HomePageModuleScssNamespace {
  export interface IHomePageModuleScss {
    description: string;
    disabled: string;
    item: string;
    link: string;
    list: string;
  }
}

declare const HomePageModuleScssModule: HomePageModuleScssNamespace.IHomePageModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HomePageModuleScssNamespace.IHomePageModuleScss;
};

export = HomePageModuleScssModule;
