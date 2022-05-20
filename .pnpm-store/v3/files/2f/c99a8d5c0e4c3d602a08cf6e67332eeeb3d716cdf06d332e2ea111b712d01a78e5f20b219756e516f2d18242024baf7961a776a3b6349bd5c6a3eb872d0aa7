import type { TransformOptions, PluginItem } from '@babel/core';
import { BabelPresetChain, PresetSetter } from './preset';
import { BabelPluginChain, PluginSetter } from './plugin';
import { BabelPlainChain, PlainSetter } from './plain';
export declare type BabelJSONConfig = {
  plugins: PluginItem[];
  presets: PluginItem[];
};
export declare type BabelChain = PlainSetter & {
  preset: PresetSetter;
  plugin: PluginSetter;
  merge: (chain: BabelChain) => BabelChain;
  toJSON: () => TransformOptions;
  readonly internal: {
    preset: BabelPresetChain;
    plugin: BabelPluginChain;
    plain: BabelPlainChain;
  };
};
export declare const createBabelChain: () => BabelChain;
export declare const babelChain: BabelChain;