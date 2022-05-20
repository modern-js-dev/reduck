"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeneratorSchema = exports.GeneratorDefaultConfig = void 0;

var _common = require("../common");

const GeneratorSchemas = [_common.PackageNameSchema, _common.PackagePathSchema, _common.PackageManagerSchema, _common.LanguageSchema];
const GeneratorSchema = {
  key: 'generator-generator',
  isObject: true,
  items: Object.values(GeneratorSchemas)
};
exports.GeneratorSchema = GeneratorSchema;
const GeneratorDefaultConfig = {
  packageManager: _common.PackageManager.Pnpm,
  language: _common.Language.TS
};
exports.GeneratorDefaultConfig = GeneratorDefaultConfig;