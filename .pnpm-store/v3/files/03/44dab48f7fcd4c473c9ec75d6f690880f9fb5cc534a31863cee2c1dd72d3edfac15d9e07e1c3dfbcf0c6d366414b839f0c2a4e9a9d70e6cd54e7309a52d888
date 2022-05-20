"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonorepoSchemas = exports.MonorepoSchema = exports.MonorepoDefaultConfig = void 0;

var _common = require("../common");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const MonorepoPackageManagerSchema = _objectSpread(_objectSpread({}, _common.PackageManagerSchema), {}, {
  items: _common.PackageManagerSchema.items.filter(item => item.key !== _common.PackageManager.Npm)
});

const MonorepoSchemas = [MonorepoPackageManagerSchema];
exports.MonorepoSchemas = MonorepoSchemas;
const MonorepoSchema = {
  key: 'monorepo',
  isObject: true,
  items: MonorepoSchemas
};
exports.MonorepoSchema = MonorepoSchema;
const MonorepoDefaultConfig = {
  packageManager: _common.PackageManager.Pnpm
};
exports.MonorepoDefaultConfig = MonorepoDefaultConfig;