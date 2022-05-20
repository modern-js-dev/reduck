"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPresetChain = void 0;

var _utils = require("@modern-js/utils");

var _babelChain = require("@modern-js/babel-chain");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const es6BrowserList = ['chrome > 61', 'edge > 16', 'firefox > 60', 'safari > 11', 'ios_saf > 11'];

const getPresetOptions = options => typeof options === 'object' ? options : {};

const getPresetChain = option => {
  const {
    appDirectory,
    presets: {
      envOptions,
      reactOptions,
      typescriptOptions
    } = {},
    syntax = 'es5',
    type = 'module',
    runEnvironments = 'browsers',
    jsxTransformRuntime = 'automatic',
    useTsLoader = false
  } = option;
  const chain = (0, _babelChain.createBabelChain)(); // set envOptions = false

  const disableEnvPreset = typeof envOptions === 'boolean' && !envOptions;
  const disableReactPreset = typeof reactOptions === 'boolean' && !reactOptions;
  const disableTypescriptPreset = typeof typescriptOptions === 'boolean' && !typescriptOptions;

  if (!disableEnvPreset) {
    const browsersTargets = syntax === 'es5' ? (0, _utils.getBrowserslist)(appDirectory) : es6BrowserList;
    const targets = runEnvironments === 'node' ? {
      node: 'current'
    } : browsersTargets;

    const presetEnvOptions = _objectSpread({
      targets,
      modules: type === 'commonjs' ? 'commonjs' : false,
      bugfixes: runEnvironments !== 'node',
      shippedProposals: type === 'module' && syntax === 'es6+'
    }, getPresetOptions(envOptions));

    chain.preset('@babel/preset-env').use(require.resolve('@babel/preset-env'), [presetEnvOptions]);
  }

  if (!disableReactPreset) {
    const classicOption = {
      useBuiltIns: !(type === 'module' && syntax === 'es5'),
      useSpread: type === 'module' && syntax === 'es5'
    }; // auto useSpread enable when automatic

    const automaticOption = {};

    const presetReactOptions = _objectSpread(_objectSpread({
      runtime: jsxTransformRuntime === 'classic' ? 'classic' : 'automatic'
    }, jsxTransformRuntime === 'classic' ? classicOption : automaticOption), getPresetOptions(reactOptions));

    chain.preset('@babel/preset-react').use(require.resolve('@babel/preset-react'), [presetReactOptions]);
  }

  if (!(useTsLoader || disableTypescriptPreset)) {
    const typescriptPresetOptions = _objectSpread({
      allowNamespaces: true,
      allExtensions: true,
      allowDeclareFields: true,
      isTSX: true
    }, getPresetOptions(typescriptOptions));

    chain.preset('@babel/preset-typescript').use(require.resolve('@babel/preset-typescript'), [typescriptPresetOptions]);
  }

  return chain;
};

exports.getPresetChain = getPresetChain;