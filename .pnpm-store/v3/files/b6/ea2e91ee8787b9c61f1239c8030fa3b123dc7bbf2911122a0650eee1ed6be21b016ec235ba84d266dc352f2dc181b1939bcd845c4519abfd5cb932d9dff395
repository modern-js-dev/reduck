"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BooleanSchemas = exports.BooleanConfigName = exports.BooleanConfig = void 0;

var _locale = require("../locale");

let BooleanConfig;
exports.BooleanConfig = BooleanConfig;

(function (BooleanConfig) {
  BooleanConfig["NO"] = "no";
  BooleanConfig["YES"] = "yes";
})(BooleanConfig || (exports.BooleanConfig = BooleanConfig = {}));

const BooleanConfigName = {
  [BooleanConfig.NO]: () => _locale.i18n.t(_locale.localeKeys.boolean.no),
  [BooleanConfig.YES]: () => _locale.i18n.t(_locale.localeKeys.boolean.yes)
};
exports.BooleanConfigName = BooleanConfigName;
const BooleanSchemas = [{
  key: BooleanConfig.NO,
  label: BooleanConfigName[BooleanConfig.NO]
}, {
  key: BooleanConfig.YES,
  label: BooleanConfigName[BooleanConfig.YES]
}];
exports.BooleanSchemas = BooleanSchemas;