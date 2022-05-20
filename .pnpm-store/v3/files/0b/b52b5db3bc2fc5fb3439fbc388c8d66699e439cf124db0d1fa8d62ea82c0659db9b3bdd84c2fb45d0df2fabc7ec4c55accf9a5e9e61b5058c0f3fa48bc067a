/// <reference types="node" />
import { IncomingMessage, Server, ServerResponse } from 'http';
import { CookieParseOptions as CookieOptions } from 'cookie';
import { IParseOptions } from 'qs';
import { Container, ContextStorage, MaybeAsync } from 'farrow-pipeline';
import { Response } from './response';
import { RouterPipeline } from './router';
import { LoggerOptions } from './logger';
import type { Options as BodyOptions } from 'co-body';
import type { RequestInfo } from './requestInfo';
import type { ResponseInfo, CustomBodyHandler } from './responseInfo';
export declare type HttpLoggerOptions = LoggerOptions & {
    /**
     * it should ignore the introspection request log of farrow-api or not
     * default is true
     */
    ignoreIntrospectionRequestOfFarrowApi?: boolean;
};
export declare type HttpPipelineOptions = {
    basenames?: string[];
    body?: BodyOptions;
    cookie?: CookieOptions;
    query?: IParseOptions;
    contexts?: (params: {
        req: IncomingMessage;
        requestInfo: RequestInfo;
        basename: string;
    }) => ContextStorage;
    logger?: boolean | HttpLoggerOptions;
    errorStack?: boolean;
};
export declare type HttpHandlerOptions = {
    onLast?: CustomBodyHandler;
};
export declare type HttpPipeline = RouterPipeline & {
    handle: (req: IncomingMessage, res: ServerResponse, options?: HttpHandlerOptions) => MaybeAsync<void>;
    listen: (...args: Parameters<Server['listen']>) => Server;
    server: () => Server;
};
export declare const NOT_FOUND_RESPONSE: Response;
export declare const createHttpPipeline: (options?: HttpPipelineOptions | undefined) => HttpPipeline;
export declare const Http: (options?: HttpPipelineOptions | undefined) => HttpPipeline;
export declare type ResponseParams = {
    requestInfo: RequestInfo;
    responseInfo: ResponseInfo;
    req: IncomingMessage;
    res: ServerResponse;
    container: Container;
};
export declare const handleResponse: (params: ResponseParams) => MaybeAsync<void>;
