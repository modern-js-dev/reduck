/// <reference types="react" />
import { RuntimeContext } from '@modern-js/runtime-core';
export declare enum RenderLevel {
  CLIENT_RENDER = 0,
  SERVER_PREFETCH = 1,
  SERVER_RENDER = 2,
}
export type { BaseSSRServerContext as SSRServerContext } from '@modern-js/types';
export declare type ModernSSRReactComponent = React.ComponentType<any> & {
  init: (context: RuntimeContext) => Promise<void>;
  prefetch: (context: RuntimeContext) => Promise<Record<string, any>>;
};
export interface RenderEntry {
  entryName: string;
  result: RenderResult;
  loadableManifest: string | undefined;
}
export declare type RenderHandler = (jsx: React.ReactElement, renderer: RenderEntry, next: (jsx: React.ReactElement) => string) => string;
export declare type RenderResult = {
  renderLevel: RenderLevel;
  html?: string;
  chunksMap: {
    js: string;
    css: string;
  };
};