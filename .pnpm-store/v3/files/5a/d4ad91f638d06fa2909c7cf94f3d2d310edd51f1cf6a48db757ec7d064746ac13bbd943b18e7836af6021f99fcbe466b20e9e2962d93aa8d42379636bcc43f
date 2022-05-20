"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PackageManagerSchema = exports.PackageManagerName = exports.PackageManager = void 0;

var _locale = require("../locale");

let PackageManager;
exports.PackageManager = PackageManager;

(function (PackageManager) {
  PackageManager["Pnpm"] = "pnpm";
  PackageManager["Yarn"] = "yarn";
  PackageManager["Npm"] = "npm";
})(PackageManager || (exports.PackageManager = PackageManager = {}));

const PackageManagerName = {
  [PackageManager.Pnpm]: () => 'pnpm',
  [PackageManager.Yarn]: () => 'Yarn',
  [PackageManager.Npm]: () => 'npm'
};
exports.PackageManagerName = PackageManagerName;
const PackageManagerSchema = {
  key: 'packageManager',
  type: ['string'],
  label: () => _locale.i18n.t(_locale.localeKeys.packageManager.self),
  mutualExclusion: true,
  when: (_values, extra) => !(extra !== null && extra !== void 0 && extra.isMonorepoSubProject),
  items: Object.values(PackageManager).map(packageManager => ({
    key: packageManager,
    label: PackageManagerName[packageManager]
  }))
};
exports.PackageManagerSchema = PackageManagerSchema;