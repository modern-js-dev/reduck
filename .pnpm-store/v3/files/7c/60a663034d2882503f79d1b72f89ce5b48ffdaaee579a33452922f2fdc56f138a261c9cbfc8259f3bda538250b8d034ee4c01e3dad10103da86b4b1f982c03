import { Model } from '@modern-js-reduck/store/dist/types/types';
declare type AsyncEffect = (...args: any[]) => Promise<any>;
declare type VoidEffect = (...args: any[]) => void;
declare type ThunkEffect = (...args: any[]) => () => any;
interface Effects {
  [key: string]: AsyncEffect | VoidEffect | ThunkEffect | Effects;
}
declare module '@modern-js-reduck/store' {
  interface ModelDesc {
    effects?: Effects;
  }
  interface GetActions<M extends Model> {
    effectsActions: M['_']['effects'] & Record<string, unknown>;
  }
}
declare const plugin: (context: import("@modern-js-reduck/store/dist/types/types/plugin").PluginContext) => import("@modern-js-reduck/store/dist/types/types/plugin").PluginLifeCycle;
export default plugin;