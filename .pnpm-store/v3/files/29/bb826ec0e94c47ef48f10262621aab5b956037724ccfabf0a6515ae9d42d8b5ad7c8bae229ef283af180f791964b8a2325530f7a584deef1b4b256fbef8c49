"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  getBaseBabelChain: true,
  getBaseBabelConfig: true
};
exports.getBaseBabelConfig = exports.getBaseBabelChain = void 0;

var _babelChain = require("@modern-js/babel-chain");

var _presets = require("./presets");

var _plugins = require("./plugins");

var _type = require("./type");

Object.keys(_type).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _type[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _type[key];
    }
  });
});

const getBaseBabelChain = option => {
  const chain = (0, _babelChain.createBabelChain)();
  const presetsChain = (0, _presets.getPresetChain)(option);
  const pluginsChain = (0, _plugins.getPluginsChain)(option);
  chain.merge(presetsChain).merge(pluginsChain);
  return chain;
};

exports.getBaseBabelChain = getBaseBabelChain;

const getBaseBabelConfig = option => getBaseBabelChain(option).toJSON();

exports.getBaseBabelConfig = getBaseBabelConfig;