declare type Filter = (str: string) => string;
export declare class Fragment {
  static filterMap: {
    [key: string]: Filter;
  };
  isVariable: boolean;
  content: string;
  filters: Filter[];
  path: string[];
  constructor(template: string);
  getValue(data: any): any;
}
export declare function toFragments(filename: string): Fragment[];
export {};