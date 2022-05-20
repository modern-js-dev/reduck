import { Pipeline } from 'farrow-pipeline';
import { MaybeAsyncResponse } from './response';
import { RequestInfo } from './requestInfo';
export declare const BasenamesContext: import("farrow-pipeline").Context<string[]>;
export declare const useBasenames: () => {
    value: string[];
};
export declare const usePrefix: () => string;
export declare const route: (name: string) => Pipeline<RequestInfo, MaybeAsyncResponse>;
export declare const handleBasenames: <T extends {
    pathname: string;
}>(basenames: string[], requestInfo: T) => {
    basename: string;
    requestInfo: T & {
        pathname: string;
    };
};
export declare const matchBasename: (basename: string, pathname: string) => boolean;
export declare const getPathSnippets: (pathname: string) => string[];
