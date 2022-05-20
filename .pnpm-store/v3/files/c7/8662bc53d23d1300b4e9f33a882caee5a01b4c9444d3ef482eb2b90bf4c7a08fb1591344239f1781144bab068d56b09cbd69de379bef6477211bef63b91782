import React from 'react';
import { Plugin } from './plugin';
import { TRuntimeContext } from './runtime-context';
export declare type CreateAppOptions = {
  plugins: Plugin[];
};
export declare const createApp: ({
  plugins
}: CreateAppOptions) => (App: React.ComponentType<any>) => React.ComponentType<any>;
interface BootStrap {
  (App: React.ComponentType, id?: string): Promise<unknown>;
  (App: React.ComponentType, serverContext: Record<string, unknown>): Promise<unknown>;
}
export declare const bootstrap: BootStrap;
export declare const useRuntimeContext: () => TRuntimeContext;
export {};