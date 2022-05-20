"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LanguageSchema = exports.LanguageName = exports.Language = void 0;

var _locale = require("../locale");

let Language;
exports.Language = Language;

(function (Language) {
  Language["TS"] = "ts";
  Language["JS"] = "js";
})(Language || (exports.Language = Language = {}));

const LanguageName = {
  [Language.TS]: () => 'TS',
  [Language.JS]: () => 'ES6+'
};
exports.LanguageName = LanguageName;
const LanguageSchema = {
  key: 'language',
  type: ['string'],
  label: () => _locale.i18n.t(_locale.localeKeys.language.self),
  mutualExclusion: true,
  items: Object.values(Language).map(language => ({
    key: language,
    label: LanguageName[language]
  }))
};
exports.LanguageSchema = LanguageSchema;