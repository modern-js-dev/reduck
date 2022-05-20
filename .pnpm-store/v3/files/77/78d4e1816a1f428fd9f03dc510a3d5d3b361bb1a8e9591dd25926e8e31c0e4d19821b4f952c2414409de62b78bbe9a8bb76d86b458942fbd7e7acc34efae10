import { i18n, localeKeys } from "../locale";
import { BooleanConfig } from "../common";
import { ClientRouteSchema, DisableStateManagementSchema, NeedModifyMWAConfigSchema, ClientRoute } from "./common";
var EntryNameSchema = {
  key: 'name',
  type: ['string'],
  label: function label() {
    return i18n.t(localeKeys.entry.name);
  },
  state: {
    value: 'entry'
  },
  validate: function validate(value) {
    if (!value) {
      return {
        success: false,
        message: i18n.t(localeKeys.entry.no_empty)
      };
    }

    if (value === 'pages') {
      return {
        success: false,
        message: i18n.t(localeKeys.entry.no_pages)
      };
    }

    return {
      success: true
    };
  },
  when: function when(_values, extra) {
    if (extra !== null && extra !== void 0 && extra.isEmptySrc) {
      return false;
    }

    return true;
  }
};
export var EntrySchemas = [EntryNameSchema, NeedModifyMWAConfigSchema, ClientRouteSchema, DisableStateManagementSchema];
export var EntrySchema = {
  key: 'entry',
  label: function label() {
    return i18n.t(localeKeys.action.element.entry);
  },
  isObject: true,
  items: EntrySchemas
};
export var MWADefaultEntryConfig = {
  needModifyMWAConfig: BooleanConfig.NO,
  clientRoute: ClientRoute.SelfControlRoute,
  disableStateManagement: BooleanConfig.NO
};