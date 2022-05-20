// eslint-disable-next-line @typescript-eslint/no-empty-interface
var APP_CONFIG_SYMBOL = 'config';
export var getConfig = function getConfig(Component) {
  return (// eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    Component[APP_CONFIG_SYMBOL]
  );
};
export var defineConfig = function defineConfig(Component, config) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  Component[APP_CONFIG_SYMBOL] = config;
  return Component;
};