"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MWADefaultEntryConfig = exports.EntrySchemas = exports.EntrySchema = void 0;

var _locale = require("../locale");

var _common = require("../common");

var _common2 = require("./common");

const EntryNameSchema = {
  key: 'name',
  type: ['string'],
  label: () => _locale.i18n.t(_locale.localeKeys.entry.name),
  state: {
    value: 'entry'
  },
  validate: value => {
    if (!value) {
      return {
        success: false,
        message: _locale.i18n.t(_locale.localeKeys.entry.no_empty)
      };
    }

    if (value === 'pages') {
      return {
        success: false,
        message: _locale.i18n.t(_locale.localeKeys.entry.no_pages)
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
const EntrySchemas = [EntryNameSchema, _common2.NeedModifyMWAConfigSchema, _common2.ClientRouteSchema, _common2.DisableStateManagementSchema];
exports.EntrySchemas = EntrySchemas;
const EntrySchema = {
  key: 'entry',
  label: () => _locale.i18n.t(_locale.localeKeys.action.element.entry),
  isObject: true,
  items: EntrySchemas
};
exports.EntrySchema = EntrySchema;
const MWADefaultEntryConfig = {
  needModifyMWAConfig: _common.BooleanConfig.NO,
  clientRoute: _common2.ClientRoute.SelfControlRoute,
  disableStateManagement: _common.BooleanConfig.NO
};
exports.MWADefaultEntryConfig = MWADefaultEntryConfig;