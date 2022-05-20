"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlugins = void 0;

var _babelChain = require("@modern-js/babel-chain");

var _alias = require("./alias");

var _env = require("./env");

var _globalVar = require("./globalVar");

const getPlugins = libPresetOption => {
  const chain = (0, _babelChain.createBabelChain)();
  const finalPlugins = [];

  if (libPresetOption.globalVars) {
    finalPlugins.push((0, _globalVar.globalVarsPlugin)(libPresetOption.globalVars));
  }

  if (libPresetOption.envVars) {
    finalPlugins.push((0, _env.envPlugin)(libPresetOption.envVars));
  }

  if (libPresetOption.alias) {
    finalPlugins.push((0, _alias.aliasPlugin)(libPresetOption.alias));
  }

  for (const plugin of finalPlugins) {
    const [name, opt] = plugin;
    chain.plugin(name).use(require.resolve(name), [opt]);
  }

  return chain;
};

exports.getPlugins = getPlugins;