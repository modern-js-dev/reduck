import type nodeFetch from 'node-fetch';
export declare type BFFRequestPayload = {
  params?: Record<string, any>;
  query?: Record<string, any>;
  body?: string;
  formUrlencoded?: never;
  formData?: FormData;
  data?: Record<string, any>;
  headers?: Record<string, any>;
  cookies?: Record<string, any>;
};
export declare type Fetch = typeof fetch | typeof nodeFetch;
export declare type Sender = ((...args: any[]) => Promise<any>) & {
  fetch?: Fetch;
};
export declare type RequestCreator = (path: string, method: string, port: number, fetch?: Fetch, headerWhiteList?: string[]) => Sender;
export declare type IOptions<F = Fetch> = {
  request?: F;
  interceptor?: (request: F) => F;
  allowedHeaders?: string[];
};