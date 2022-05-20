import { HttpMethod } from '../constant';
import { Result } from './result';
export declare type GenClientResult = Result<string>;
export declare type GenClientOptions = {
  resourcePath: string;
  source: string;
  apiDir: string;
  prefix: string;
  port: number;
  requestCreator?: string;
  fetcher?: string;
  target?: string;
  requireResolve?: typeof require.resolve;
};
export declare const DEFAULT_CLIENT_REQUEST_CREATOR = "@modern-js/create-request";
export declare const generateClient: ({
  resourcePath,
  source,
  apiDir,
  prefix,
  port,
  target,
  requestCreator,
  fetcher,
  requireResolve
}: GenClientOptions) => Promise<GenClientResult>;
export declare const getMethodAndStatementFromName: (name: string) => Result<[HttpMethod, string]>;