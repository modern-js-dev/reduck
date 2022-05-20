import type { PluginItem } from '@babel/core';
export declare type Preset = {
  name: string;
  path?: string;
  options: any[];
};
export declare type PresetSetter = (name: string) => {
  tap: (options: any[]) => void;
  delete: () => void;
  ban: () => void;
  filter: Preset[]['filter'];
  options: () => any[];
  use: (path: string, options?: any[]) => void;
};
export declare type BabelPresetChain = {
  preset: PresetSetter;
  presets: Preset[];
  blacks: string[];
  toJSON: () => PluginItem[];
  merge: (other: BabelPresetChain) => BabelPresetChain;
};
export declare const createBabelPresetChain: () => BabelPresetChain;