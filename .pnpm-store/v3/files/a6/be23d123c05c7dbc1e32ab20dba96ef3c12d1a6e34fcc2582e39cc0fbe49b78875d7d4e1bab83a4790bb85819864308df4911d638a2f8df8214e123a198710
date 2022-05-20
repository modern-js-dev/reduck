import { i18n, localeKeys } from "../locale";
import { FrameworkSchema, Framework } from "./common";
export var BFFType;

(function (BFFType) {
  BFFType["Func"] = "func";
  BFFType["Framework"] = "framework";
})(BFFType || (BFFType = {}));

export var BFFTypeSchema = {
  key: 'bffType',
  type: ['string'],
  label: function label() {
    return i18n.t(localeKeys.bff.bffType.self);
  },
  mutualExclusion: true,
  items: Object.values(BFFType).map(function (bffType) {
    return {
      key: bffType,
      label: function label() {
        return i18n.t(localeKeys.bff.bffType[bffType]);
      }
    };
  })
};
export var BFFSchemas = [BFFTypeSchema, FrameworkSchema];
export var BFFSchema = {
  key: 'bff',
  label: function label() {
    return i18n.t(localeKeys.action["function"].bff);
  },
  isObject: true,
  items: BFFSchemas
};
export var MWADefaultBffConfig = {
  bffType: BFFType.Func,
  frameWork: Framework.Express
};