"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PackagePathSchema = void 0;

var _locale = require("../locale");

const PackagePathRegex = new RegExp('^[a-z0-9]*[-_/]?([a-z0-9]*[-_]?[a-z0-9]*)*[-_/]?[a-z0-9-_]+$');
const PackagePathSchema = {
  key: 'packagePath',
  label: () => _locale.i18n.t(_locale.localeKeys.packagePath.self),
  type: ['string'],
  when: (_, extra) => Boolean(extra === null || extra === void 0 ? void 0 : extra.isMonorepoSubProject),
  state: {
    value: {
      effectedByFields: ['packageName'],
      action: data => `${data.packageName || ''}`
    }
  },
  validate: value => {
    if (!value) {
      return {
        success: false,
        message: _locale.i18n.t(_locale.localeKeys.packagePath.no_empty)
      };
    }

    if (!PackagePathRegex.test(value)) {
      return {
        success: false,
        message: _locale.i18n.t(_locale.localeKeys.packagePath.format)
      };
    }

    return {
      success: true
    };
  }
};
exports.PackagePathSchema = PackagePathSchema;