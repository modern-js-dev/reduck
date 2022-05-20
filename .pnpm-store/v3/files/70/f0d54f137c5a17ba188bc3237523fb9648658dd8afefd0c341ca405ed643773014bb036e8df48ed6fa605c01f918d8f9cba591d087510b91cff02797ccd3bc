import { i18n, localeKeys } from "../locale";
export let BooleanConfig;

(function (BooleanConfig) {
  BooleanConfig["NO"] = "no";
  BooleanConfig["YES"] = "yes";
})(BooleanConfig || (BooleanConfig = {}));

export const BooleanConfigName = {
  [BooleanConfig.NO]: () => i18n.t(localeKeys.boolean.no),
  [BooleanConfig.YES]: () => i18n.t(localeKeys.boolean.yes)
};
export const BooleanSchemas = [{
  key: BooleanConfig.NO,
  label: BooleanConfigName[BooleanConfig.NO]
}, {
  key: BooleanConfig.YES,
  label: BooleanConfigName[BooleanConfig.YES]
}];