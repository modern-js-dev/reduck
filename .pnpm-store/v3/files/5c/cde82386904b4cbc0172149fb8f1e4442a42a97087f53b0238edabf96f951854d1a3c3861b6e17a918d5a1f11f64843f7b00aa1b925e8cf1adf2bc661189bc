import { ILibPresetOption, ISyntaxOption } from '@modern-js/babel-preset-lib';
import { TransformOptions } from '@babel/core';
import type { NormalizedConfig } from '@modern-js/core';
export * from '@babel/core';
export interface ITsconfig {
  compilerOptions?: {
    rootDir?: string;
    baseUrl?: string;
    declaration?: boolean;
    emitDeclarationOnly?: boolean;
    isolatedModules?: boolean;
    allowJs?: boolean;
    outDir?: string;
    paths?: Record<string, string[]>;
  } | undefined;
  include?: string[];
  exclude?: string[];
}
export declare const readTsConfig: <T extends ITsconfig | null>(tsconfigPath: string, noExistReturn?: T) => ITsconfig | T;
export declare const existTsConfigFile: (tsconfigAbsolutePath: string) => boolean;
export declare const getBabelConfig: (libPresetOption: ILibPresetOption, syntaxOption: ISyntaxOption) => TransformOptions;
export interface IPackageModeValue {
  type: 'module' | 'commonjs';
  syntax: 'es5' | 'es6+';
  tsconfigPath: string;
}
export declare const resolveBabelConfig: (appDirectory: string, modernConfig: NormalizedConfig, option: IPackageModeValue) => any;