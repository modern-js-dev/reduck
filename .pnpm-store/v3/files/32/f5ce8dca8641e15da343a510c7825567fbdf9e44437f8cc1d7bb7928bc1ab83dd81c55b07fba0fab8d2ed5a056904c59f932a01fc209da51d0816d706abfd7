import { FsResource } from './FsResource';
export declare class FsMaterial {
  basePath: string;
  constructor(basePath: string);
  get(resourceKey: string): FsResource;
  find(globStr: string, options?: {
    nodir?: boolean;
    dot?: boolean;
    ignore?: string | readonly string[];
  }): Promise<Record<string, FsResource>>;
}