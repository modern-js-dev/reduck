/// <reference types="node" />
import { IncomingHttpHeaders } from 'http';
import url from 'url';
export declare function namespaceHash(namespace: string, hash: string): string;
export declare function fname(lv: number): string;
export declare function connectFactor(...args: string[]): string;
export declare function valueFactory(obj: url.URLSearchParams | IncomingHttpHeaders): ((key: string) => string | null) | ((key: string) => string | undefined);
export declare function getTime([s, ns]: [number, number]): number;
export declare function cacheAddition(html: string, hash: string): string;
declare type CoalescedInvoke<T> = {
  isOrigin: boolean;
  value: T;
};
declare type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
export declare function withCoalescedInvoke<F extends (...args: any[]) => Promise<any>>(func: F): (key: string, args: Parameters<F>) => Promise<CoalescedInvoke<UnwrapPromise<ReturnType<F>>>>;
export declare function maybeSync(fn: () => Promise<any>): (sync: boolean) => Promise<any>;
export {};