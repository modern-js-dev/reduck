import { IStyledComponentOptions } from './type';
export interface IBaseBabelConfigOption {
  appDirectory: string;
  presets?: {
    envOptions?: boolean | Record<string, any>;
    reactOptions?: boolean | Record<string, any>;
    typescriptOptions?: boolean | Record<string, any>;
  };
  plugins?: {
    transformRuntime?: any;
    import?: {
      antd?: {
        libraryDirectory: string;
      };
    };
    transformReactRemovePropTypes?: false | Record<string, any>;
    styledComponentsOptions?: IStyledComponentOptions;
    lodashOptions?: any;
  };
  useLegacyDecorators?: boolean;
  syntax?: 'es5' | 'es6+';
  type?: 'module' | 'commonjs';
  runEnvironments?: 'node' | 'browsers';
  jsxTransformRuntime?: 'automatic' | 'classic';
  useTsLoader?: boolean;
}
export declare const getBaseBabelChain: (option: IBaseBabelConfigOption) => import("@modern-js/babel-chain").BabelChain;
export declare const getBaseBabelConfig: any;
export * from './type';