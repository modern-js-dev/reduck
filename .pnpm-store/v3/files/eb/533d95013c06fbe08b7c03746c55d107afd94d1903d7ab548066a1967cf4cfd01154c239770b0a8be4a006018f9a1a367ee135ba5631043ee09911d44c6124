// eslint-disable-next-line @typescript-eslint/no-empty-interface
const APP_CONFIG_SYMBOL = 'config';
export const getConfig = Component => // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
Component[APP_CONFIG_SYMBOL];
export const defineConfig = (Component, config) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  Component[APP_CONFIG_SYMBOL] = config;
  return Component;
};