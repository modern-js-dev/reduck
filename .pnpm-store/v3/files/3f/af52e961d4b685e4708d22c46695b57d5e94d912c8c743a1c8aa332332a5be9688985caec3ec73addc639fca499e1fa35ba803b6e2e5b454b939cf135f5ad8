"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.envPlugin = void 0;

/**
 * BUILD_MODE: nodejs = CJS+ES6, legacy-browser = ESM+ES5, modern = ESM+ES6, testing, storybook
 * NODE_ENV = development, production
 */
const defaultEnvVars = [];

const envPlugin = (envVars = defaultEnvVars) => ['babel-plugin-transform-inline-environment-variables', {
  include: [...defaultEnvVars, ...envVars]
}];

exports.envPlugin = envPlugin;