import { i18n, localeKeys } from "../locale";
export let PackageManager;

(function (PackageManager) {
  PackageManager["Pnpm"] = "pnpm";
  PackageManager["Yarn"] = "yarn";
  PackageManager["Npm"] = "npm";
})(PackageManager || (PackageManager = {}));

export const PackageManagerName = {
  [PackageManager.Pnpm]: () => 'pnpm',
  [PackageManager.Yarn]: () => 'Yarn',
  [PackageManager.Npm]: () => 'npm'
};
export const PackageManagerSchema = {
  key: 'packageManager',
  type: ['string'],
  label: () => i18n.t(localeKeys.packageManager.self),
  mutualExclusion: true,
  when: (_values, extra) => !(extra !== null && extra !== void 0 && extra.isMonorepoSubProject),
  items: Object.values(PackageManager).map(packageManager => ({
    key: packageManager,
    label: PackageManagerName[packageManager]
  }))
};