import { i18n, localeKeys } from "../locale";
import { BooleanConfig } from "../common";
import { ClientRouteSchema, DisableStateManagementSchema, NeedModifyMWAConfigSchema, ClientRoute } from "./common";
const EntryNameSchema = {
  key: 'name',
  type: ['string'],
  label: () => i18n.t(localeKeys.entry.name),
  state: {
    value: 'entry'
  },
  validate: value => {
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
  when: (_values, extra) => {
    if (extra !== null && extra !== void 0 && extra.isEmptySrc) {
      return false;
    }

    return true;
  }
};
export const EntrySchemas = [EntryNameSchema, NeedModifyMWAConfigSchema, ClientRouteSchema, DisableStateManagementSchema];
export const EntrySchema = {
  key: 'entry',
  label: () => i18n.t(localeKeys.action.element.entry),
  isObject: true,
  items: EntrySchemas
};
export const MWADefaultEntryConfig = {
  needModifyMWAConfig: BooleanConfig.NO,
  clientRoute: ClientRoute.SelfControlRoute,
  disableStateManagement: BooleanConfig.NO
};