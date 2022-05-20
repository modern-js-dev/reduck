/// <reference types="node" />
import { Server } from 'https';
import { HttpHandlerOptions } from './http';
import type { IncomingMessage, ServerResponse } from 'http';
import type { SecureContextOptions, TlsOptions } from 'tls';
import type { HttpPipelineOptions } from './http';
import type { RouterPipeline } from './router';
export declare type HttpsOptions = SecureContextOptions & TlsOptions;
export declare type HttpsPipelineOptions = HttpPipelineOptions & {
    tls?: HttpsOptions;
};
export declare type HttpsPipeline = RouterPipeline & {
    handle: (req: IncomingMessage, res: ServerResponse, options?: HttpHandlerOptions) => void;
    listen: (...args: Parameters<Server['listen']>) => Server;
    server: () => Server;
};
export declare const createHttpsPipeline: (options?: HttpsPipelineOptions | undefined) => HttpsPipeline;
export declare const Https: (options?: HttpsPipelineOptions | undefined) => HttpsPipeline;
