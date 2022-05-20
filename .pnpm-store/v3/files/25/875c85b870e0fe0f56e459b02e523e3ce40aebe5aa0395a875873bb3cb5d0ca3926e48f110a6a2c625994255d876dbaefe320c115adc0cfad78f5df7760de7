function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { i18n, localeKeys } from "../locale";
import { BooleanConfig, BooleanSchemas, Language, LanguageSchema, PackageManager, PackageManagerSchema, PackageNameSchema, PackagePathSchema } from "../common";
import { EnableLessSchema, EnableSassSchema } from "../common/css";
export const moduleConfigWhenFunc = values => values.needModifyModuleConfig === BooleanConfig.YES;
export const EnableModuleLessSchema = _objectSpread(_objectSpread({}, EnableLessSchema), {}, {
  when: moduleConfigWhenFunc
});
export const EnableModuleSassSchema = _objectSpread(_objectSpread({}, EnableSassSchema), {}, {
  when: moduleConfigWhenFunc
});
export const NeedModifyModuleConfigSchema = {
  key: 'needModifyModuleConfig',
  label: () => i18n.t(localeKeys.needModifyConfig.self),
  type: ['string'],
  mutualExclusion: true,
  state: {
    value: BooleanConfig.NO
  },
  items: BooleanSchemas
};
export const ModuleSchemas = [PackageNameSchema, PackagePathSchema, LanguageSchema, PackageManagerSchema, NeedModifyModuleConfigSchema, EnableModuleLessSchema, EnableModuleSassSchema];
export const ModuleSchema = {
  key: 'module',
  isObject: true,
  items: ModuleSchemas
};
export const ModuleDefaultConfig = {
  language: Language.TS,
  packageManager: PackageManager.Pnpm,
  needModifyModuleConfig: BooleanConfig.NO,
  enableLess: BooleanConfig.NO,
  enableSass: BooleanConfig.NO
};