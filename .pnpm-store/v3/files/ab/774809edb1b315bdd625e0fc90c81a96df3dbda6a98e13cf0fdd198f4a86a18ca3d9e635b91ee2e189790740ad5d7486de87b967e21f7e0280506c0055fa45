import { i18n, localeKeys } from "../locale";
export let Language;

(function (Language) {
  Language["TS"] = "ts";
  Language["JS"] = "js";
})(Language || (Language = {}));

export const LanguageName = {
  [Language.TS]: () => 'TS',
  [Language.JS]: () => 'ES6+'
};
export const LanguageSchema = {
  key: 'language',
  type: ['string'],
  label: () => i18n.t(localeKeys.language.self),
  mutualExclusion: true,
  items: Object.values(Language).map(language => ({
    key: language,
    label: LanguageName[language]
  }))
};