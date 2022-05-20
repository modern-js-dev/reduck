"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "I18n", {
  enumerable: true,
  get: function () {
    return _pluginI18n.I18n;
  }
});
exports.localeKeys = exports.i18n = void 0;

var _pluginI18n = require("@modern-js/plugin-i18n");

var _zh = require("./zh");

var _en = require("./en");

const i18n = new _pluginI18n.I18n();
exports.i18n = i18n;
const localeKeys = i18n.init('zh', {
  zh: _zh.ZH_LOCALE,
  en: _en.EN_LOCALE
});
exports.localeKeys = localeKeys;