import { BaseSSRServerContext } from '@modern-js/types/server';
declare type MetaKeyMap = {
  header?: string[];
  query?: string[];
};
declare type MetaKeyMatch = {
  header?: MatchMap;
  query?: MatchMap;
};
declare type MatchMap = Record<string, Record<string, string>>;
export declare type CacheConfig = {
  interval: number;
  staleLimit: number | boolean;
  level: number;
  includes?: MetaKeyMap | null;
  excludes?: MetaKeyMap | null;
  matches?: MetaKeyMatch | null;
};
export declare enum RenderLevel {
  CLIENT_RENDER = 0,
  SERVER_PREFETCH = 1,
  SERVER_RENDER = 2,
}
export declare type SSRServerContext = BaseSSRServerContext & {
  cacheConfig?: CacheConfig;
  staticGenerate?: boolean;
};
export declare type ModernSSRReactComponent = React.ComponentType<any> & {
  init: (context: SSRServerContext) => Promise<void>;
  prefetch: (context: SSRServerContext) => Promise<Record<string, any>>;
};
export declare type RenderFunction = (context: SSRServerContext) => Promise<string>;
export {};