"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfig = exports.defineConfig = void 0;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
const APP_CONFIG_SYMBOL = 'config';

const getConfig = Component => // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
Component[APP_CONFIG_SYMBOL];

exports.getConfig = getConfig;

const defineConfig = (Component, config) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  Component[APP_CONFIG_SYMBOL] = config;
  return Component;
};

exports.defineConfig = defineConfig;