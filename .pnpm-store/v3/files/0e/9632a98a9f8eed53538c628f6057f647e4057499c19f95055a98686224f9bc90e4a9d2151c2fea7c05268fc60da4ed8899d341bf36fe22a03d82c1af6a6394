import { RuntimeContext } from '@modern-js/runtime-core';
import { ModernSSRReactComponent } from './type';
declare module '@modern-js/runtime' {
  interface RuntimeContext {
    ssrContext?: any;
  }
}
export declare const render: (ctx: RuntimeContext, _: string | undefined, App: ModernSSRReactComponent) => Promise<string>;