/// <reference types="node" />
import type { SetOption as CookieOptions } from 'cookies';
import type { IncomingMessage, ServerResponse } from 'http';
import type Stream from 'stream';
import contentDisposition from 'content-disposition';
import type { RequestInfo } from './requestInfo';
import type { JsonType } from 'farrow-schema';
export declare type Value = string | number;
export declare type Values = {
    [key: string]: Value;
};
export declare type Status = {
    code: number;
    message?: string;
};
export declare type Headers = {
    [key: string]: Value;
};
export declare type Cookies = {
    [key: string]: {
        value: Value | null;
        options?: CookieOptions;
    };
};
export declare type SharedResponseInfo = {
    status?: Status;
    headers?: Headers;
    cookies?: Cookies;
};
export declare type EmptyBody = {
    type: 'empty';
    value: null;
};
export declare type StringBody = {
    type: 'string';
    value: string;
};
export declare type JsonBody = {
    type: 'json';
    value: JsonType;
};
export declare type StreamBody = {
    type: 'stream';
    value: Stream;
};
export declare type BufferBody = {
    type: 'buffer';
    value: Buffer;
};
export declare type RedirectBody = {
    type: 'redirect';
    usePrefix: boolean;
    value: string;
};
export declare type FileBodyOptions = {
    flags?: string;
    encoding?: BufferEncoding;
    fd?: number;
    mode?: number;
    autoClose?: boolean;
    emitClose?: boolean;
    start?: number;
    end?: number;
    highWaterMark?: number;
};
export declare type FileBody = {
    type: 'file';
    value: string;
    options?: FileBodyOptions;
};
export declare type CustomBodyHandler = (arg: {
    req: IncomingMessage;
    res: ServerResponse;
    requestInfo: RequestInfo;
    responseInfo: Omit<ResponseInfo, 'body'>;
}) => any;
export declare type CustomBody = {
    type: 'custom';
    handler: CustomBodyHandler;
};
export declare type Body = EmptyBody | StringBody | JsonBody | StreamBody | BufferBody | FileBody | CustomBody | RedirectBody;
export declare type BodyMap = {
    [V in Body as V['type']]: V;
};
export declare type ResponseInfo = {
    status?: Status;
    headers?: Headers;
    cookies?: Cookies;
    body?: Body;
    vary?: string[];
};
export declare const empty: () => ResponseInfo;
export declare const string: (value: string) => ResponseInfo;
export declare type RedirectOptions = {
    usePrefix?: boolean;
};
export declare const redirect: (url: string, options?: RedirectOptions | undefined) => ResponseInfo;
export declare const custom: (handler?: CustomBodyHandler) => ResponseInfo;
export declare const stream: (stream: Stream) => ResponseInfo;
export declare const buffer: (buffer: Buffer) => ResponseInfo;
export declare const file: (filename: string, options?: FileBodyOptions | undefined) => ResponseInfo;
export declare const attachment: (filename?: string | undefined, options?: contentDisposition.Options | undefined) => ResponseInfo;
export declare const status: (code: number, message?: string) => ResponseInfo;
export declare const headers: (headers: Headers) => ResponseInfo;
export declare const header: (name: string, value: Value) => ResponseInfo;
export declare const cookies: (config: {
    [key: string]: Value | null;
}, options?: CookieOptions | undefined) => ResponseInfo;
export declare const cookie: (name: string, value: Value | null, options?: CookieOptions | undefined) => ResponseInfo;
export declare const vary: (...fileds: string[]) => ResponseInfo;
export declare const merge: (...responses: ResponseInfo[]) => ResponseInfo;
export declare const type: (type: string) => ResponseInfo;
export declare const is: (info: ResponseInfo, ...types: string[]) => string | false;
export declare const text: (value: string) => ResponseInfo;
export declare const html: (value: string) => ResponseInfo;
export declare const json: (value: JsonType) => ResponseInfo;
