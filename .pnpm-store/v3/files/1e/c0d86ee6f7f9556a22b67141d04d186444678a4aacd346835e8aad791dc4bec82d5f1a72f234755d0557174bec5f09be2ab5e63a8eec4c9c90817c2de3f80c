export const createPluginCore = pluginContext => {
  const lifeCycleList = [];

  const findHandlers = stage => lifeCycleList.map(liftCycle => liftCycle[stage]).filter(Boolean);

  return {
    usePlugin: plugin => {
      lifeCycleList.push(plugin(pluginContext));
    },
    revokePipeline: (stage, bypassParams, ...args) => {
      const handlers = findHandlers(stage);
      let params = bypassParams;

      for (const handler of handlers) {
        params = handler(params, ...args);
      }

      return params;
    },
    revokeWaterFall: (stage, ...args) => {
      const handlers = findHandlers(stage);
      return handlers.forEach(handler => handler(...args));
    }
  };
};