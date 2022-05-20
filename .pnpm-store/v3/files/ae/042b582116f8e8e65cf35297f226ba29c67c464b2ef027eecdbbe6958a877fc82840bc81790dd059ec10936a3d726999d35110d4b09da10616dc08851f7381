export declare type SprProps = {
  interval: number;
  staleLimit: number | boolean;
  level: number;
  includes: MetaKeyMap | null;
  excludes: MetaKeyMap | null;
  fallback: boolean;
  matches: MetaKeyMatch | null;
};
export declare type GeneralizedProps = SprProps & {
  [propName: string]: any;
};
export declare type SprConstructor = {
  config: () => SprProps;
};
export declare type MetaKeyMap = {
  header?: string[];
  query?: string[];
};
declare type MatchMap = {
  [propName: string]: {
    [propName: string]: string;
  };
};
export declare type MetaKeyMatch = {
  header?: MatchMap;
  query?: MatchMap;
};
export {};