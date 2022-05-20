"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnableSassSchema = exports.EnableLessSchema = void 0;

var _locale = require("../locale");

var _boolean = require("./boolean");

const EnableLessSchema = {
  key: 'enableLess',
  type: ['string'],
  label: () => _locale.i18n.t(_locale.localeKeys.needModifyConfig.enableLess),
  mutualExclusion: true,
  state: {
    value: _boolean.BooleanConfig.NO
  },
  items: _boolean.BooleanSchemas
};
exports.EnableLessSchema = EnableLessSchema;
const EnableSassSchema = {
  key: 'enableSass',
  type: ['string'],
  label: () => _locale.i18n.t(_locale.localeKeys.needModifyConfig.enableSass),
  mutualExclusion: true,
  state: {
    value: _boolean.BooleanConfig.NO
  },
  items: _boolean.BooleanSchemas
};
exports.EnableSassSchema = EnableSassSchema;