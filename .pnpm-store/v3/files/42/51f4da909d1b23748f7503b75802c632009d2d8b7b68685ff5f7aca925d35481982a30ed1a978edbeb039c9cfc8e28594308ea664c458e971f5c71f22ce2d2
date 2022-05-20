import type { TransformOptions } from '@babel/core';
export declare type BabelPlainConfig = Omit<TransformOptions, 'plugins' | 'presets'>;
export declare type GetSetter<T extends Record<string, any>> = { [K in keyof T]: (input: T[K]) => void };
export declare type PlainSetter = {
  delete: (key: keyof BabelPlainConfig) => void;
} & GetSetter<Required<BabelPlainConfig>>;
export declare type BabelPlainChain = {
  plain: PlainSetter;
  toJSON: () => BabelPlainConfig;
  merge: (other: BabelPlainChain) => BabelPlainChain;
};
export declare const createBabelPlainChain: () => BabelPlainChain;