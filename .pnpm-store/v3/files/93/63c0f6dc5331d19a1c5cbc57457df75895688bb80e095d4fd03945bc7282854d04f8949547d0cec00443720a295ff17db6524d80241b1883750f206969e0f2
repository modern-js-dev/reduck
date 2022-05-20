"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moduleConfigWhenFunc = exports.NeedModifyModuleConfigSchema = exports.ModuleSchemas = exports.ModuleSchema = exports.ModuleDefaultConfig = exports.EnableModuleSassSchema = exports.EnableModuleLessSchema = void 0;

var _locale = require("../locale");

var _common = require("../common");

var _css = require("../common/css");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const moduleConfigWhenFunc = values => values.needModifyModuleConfig === _common.BooleanConfig.YES;

exports.moduleConfigWhenFunc = moduleConfigWhenFunc;

const EnableModuleLessSchema = _objectSpread(_objectSpread({}, _css.EnableLessSchema), {}, {
  when: moduleConfigWhenFunc
});

exports.EnableModuleLessSchema = EnableModuleLessSchema;

const EnableModuleSassSchema = _objectSpread(_objectSpread({}, _css.EnableSassSchema), {}, {
  when: moduleConfigWhenFunc
});

exports.EnableModuleSassSchema = EnableModuleSassSchema;
const NeedModifyModuleConfigSchema = {
  key: 'needModifyModuleConfig',
  label: () => _locale.i18n.t(_locale.localeKeys.needModifyConfig.self),
  type: ['string'],
  mutualExclusion: true,
  state: {
    value: _common.BooleanConfig.NO
  },
  items: _common.BooleanSchemas
};
exports.NeedModifyModuleConfigSchema = NeedModifyModuleConfigSchema;
const ModuleSchemas = [_common.PackageNameSchema, _common.PackagePathSchema, _common.LanguageSchema, _common.PackageManagerSchema, NeedModifyModuleConfigSchema, EnableModuleLessSchema, EnableModuleSassSchema];
exports.ModuleSchemas = ModuleSchemas;
const ModuleSchema = {
  key: 'module',
  isObject: true,
  items: ModuleSchemas
};
exports.ModuleSchema = ModuleSchema;
const ModuleDefaultConfig = {
  language: _common.Language.TS,
  packageManager: _common.PackageManager.Pnpm,
  needModifyModuleConfig: _common.BooleanConfig.NO,
  enableLess: _common.BooleanConfig.NO,
  enableSass: _common.BooleanConfig.NO
};
exports.ModuleDefaultConfig = ModuleDefaultConfig;