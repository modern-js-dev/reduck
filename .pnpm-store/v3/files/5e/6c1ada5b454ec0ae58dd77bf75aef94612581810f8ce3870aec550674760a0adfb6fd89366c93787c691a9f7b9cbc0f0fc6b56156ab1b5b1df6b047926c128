import type { PluginItem } from '@babel/core';
export declare type Plugin = {
  name: string;
  path?: string;
  options: any[];
};
export declare type PluginSetter = (name: string) => {
  tap: (options: any[]) => void;
  delete: () => void;
  ban: () => void;
  options: () => any[];
  filter: Plugin[]['filter'];
  use: (path: string, options?: any[]) => void;
};
export declare type BabelPluginChain = {
  plugin: PluginSetter;
  plugins: Plugin[];
  blacks: string[];
  toJSON: () => PluginItem[];
  merge: (other: BabelPluginChain) => BabelPluginChain;
};
export declare const createBabelPluginChain: () => BabelPluginChain;