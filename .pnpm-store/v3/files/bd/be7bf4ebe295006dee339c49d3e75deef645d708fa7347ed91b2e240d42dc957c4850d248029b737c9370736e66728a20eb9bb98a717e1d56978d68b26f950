import { Plugin, PluginContext, PluginLifeCycle } from "../types/plugin.d";
export declare const createPluginCore: (pluginContext: PluginContext) => {
  usePlugin: (plugin: Plugin) => void;
  revokePipeline: <S extends keyof PluginLifeCycle>(stage: S, bypassParams: Parameters<PluginLifeCycle[S]>[0], ...args: Parameters<PluginLifeCycle[S]> extends [any, ...infer T] ? T : []) => Parameters<PluginLifeCycle[S]>[0];
  revokeWaterFall: <S_1 extends keyof PluginLifeCycle>(stage: S_1, ...args: Parameters<PluginLifeCycle[S_1]>) => void;
};