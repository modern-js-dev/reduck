"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBabelChain = exports.babelChain = void 0;

var _preset = require("./preset");

var _plugin = require("./plugin");

var _plain = require("./plain");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const createBabelChain = () => {
  const presetChain = (0, _preset.createBabelPresetChain)();
  const pluginChain = (0, _plugin.createBabelPluginChain)();
  const plainChain = (0, _plain.createBabelPlainChain)();

  const merge = other => {
    presetChain.merge(other.internal.preset);
    pluginChain.merge(other.internal.plugin);
    plainChain.merge(other.internal.plain);
    return chain;
  };

  const toJSON = () => _objectSpread(_objectSpread({}, plainChain.toJSON()), {}, {
    presets: presetChain.toJSON(),
    plugins: pluginChain.toJSON()
  });

  const chain = _objectSpread(_objectSpread({}, plainChain.plain), {}, {
    plugin: pluginChain.plugin,
    preset: presetChain.preset,
    toJSON,
    merge,

    get internal() {
      return {
        preset: presetChain,
        plugin: pluginChain,
        plain: plainChain
      };
    }

  });

  return chain;
};

exports.createBabelChain = createBabelChain;
const babelChain = createBabelChain();
exports.babelChain = babelChain;