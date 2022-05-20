"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MWADefaultBffConfig = exports.BFFTypeSchema = exports.BFFType = exports.BFFSchemas = exports.BFFSchema = void 0;

var _locale = require("../locale");

var _common = require("./common");

let BFFType;
exports.BFFType = BFFType;

(function (BFFType) {
  BFFType["Func"] = "func";
  BFFType["Framework"] = "framework";
})(BFFType || (exports.BFFType = BFFType = {}));

const BFFTypeSchema = {
  key: 'bffType',
  type: ['string'],
  label: () => _locale.i18n.t(_locale.localeKeys.bff.bffType.self),
  mutualExclusion: true,
  items: Object.values(BFFType).map(bffType => ({
    key: bffType,
    label: () => _locale.i18n.t(_locale.localeKeys.bff.bffType[bffType])
  }))
};
exports.BFFTypeSchema = BFFTypeSchema;
const BFFSchemas = [BFFTypeSchema, _common.FrameworkSchema];
exports.BFFSchemas = BFFSchemas;
const BFFSchema = {
  key: 'bff',
  label: () => _locale.i18n.t(_locale.localeKeys.action.function.bff),
  isObject: true,
  items: BFFSchemas
};
exports.BFFSchema = BFFSchema;
const MWADefaultBffConfig = {
  bffType: BFFType.Func,
  frameWork: _common.Framework.Express
};
exports.MWADefaultBffConfig = MWADefaultBffConfig;