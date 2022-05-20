/// <reference types="node" />
import fs from 'fs';
import parseBody from 'co-body';
import type { IncomingMessage, ServerResponse } from 'http';
import type { MaybeAsync } from 'farrow-pipeline';
export declare type PrettyNumberOptions = {
    delimiter?: string;
    separator?: string;
};
export declare const defaultPrettyNumberOptions: Required<PrettyNumberOptions>;
export declare const prettyNumber: (number: number | string, options?: PrettyNumberOptions | undefined) => string;
export declare const prettyTime: (start: number) => string;
export declare const access: typeof fs.promises.access, stat: typeof fs.promises.stat;
export declare const getStats: (filename: string) => Promise<fs.Stats | undefined>;
export declare const getContentLength: (res: ServerResponse) => number;
export declare const getBody: (req: IncomingMessage, options?: parseBody.Options | undefined) => Promise<any> | null;
export declare const isPromise: <Input>(input: MaybeAsync<Input>) => input is Promise<Input>;
