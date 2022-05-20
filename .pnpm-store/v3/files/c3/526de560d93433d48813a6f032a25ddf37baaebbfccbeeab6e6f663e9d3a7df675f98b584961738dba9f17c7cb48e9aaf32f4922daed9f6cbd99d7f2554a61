import type { RequestInfo } from './requestInfo';
export declare type LoggerArgs = {
    requestInfo: RequestInfo;
};
export declare type LoggerOptions = {
    transporter?: (str: string) => void;
};
export declare type LoggerEvent = 'error' | 'close' | 'finish';
export declare const createLogger: (options?: LoggerOptions | undefined) => {
    print: (format: string, ...args: (string | number)[]) => void;
    logInput: (method: string, url: string) => void;
    logOutput: (method: string, url: string, status: number, startTime: number, contentLength: number, event: LoggerEvent) => void;
};
