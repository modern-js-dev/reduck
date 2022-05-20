"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MWASchemas = exports.MWASchema = exports.MWADefaultConfig = void 0;

var _common = require("../common");

var _common2 = require("./common");

const MWASchemas = [_common.PackageNameSchema, _common.PackagePathSchema, _common.LanguageSchema, _common.PackageManagerSchema, _common2.RunWaySchema, _common2.NeedModifyMWAConfigSchema, _common2.ClientRouteSchema, _common2.DisableStateManagementSchema, _common2.EnableMWALessSchema, _common2.EnableMWASassSchema];
exports.MWASchemas = MWASchemas;
const MWASchema = {
  key: 'mwa',
  isObject: true,
  items: MWASchemas
};
exports.MWASchema = MWASchema;
const MWADefaultConfig = {
  language: _common.Language.TS,
  packageManager: _common.PackageManager.Pnpm,
  runWay: _common2.RunWay.No,
  needModifyMWAConfig: _common.BooleanConfig.NO,
  clientRoute: _common2.ClientRoute.SelfControlRoute,
  disableStateManagement: _common.BooleanConfig.NO,
  enableLess: _common.BooleanConfig.NO,
  enableSass: _common.BooleanConfig.NO
};
exports.MWADefaultConfig = MWADefaultConfig;