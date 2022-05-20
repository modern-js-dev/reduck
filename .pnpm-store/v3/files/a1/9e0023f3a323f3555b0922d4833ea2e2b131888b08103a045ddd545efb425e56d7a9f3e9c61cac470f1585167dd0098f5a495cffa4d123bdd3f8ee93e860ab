"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PackageNameSchema = void 0;

var _locale = require("../locale");

const PackageNameSchema = {
  key: 'packageName',
  label: (_, extra) => extra !== null && extra !== void 0 && extra.isMonorepoSubProject ? _locale.i18n.t(_locale.localeKeys.packageName.sub_name) : _locale.i18n.t(_locale.localeKeys.packageName.self),
  type: ['string'],
  when: (_, extra) => Boolean(extra === null || extra === void 0 ? void 0 : extra.isMonorepoSubProject) || !(extra !== null && extra !== void 0 && extra.isMwa),
  validate: value => {
    if (!value) {
      return {
        success: false,
        message: _locale.i18n.t(_locale.localeKeys.packageName.no_empty)
      };
    }

    return {
      success: true
    };
  }
};
exports.PackageNameSchema = PackageNameSchema;