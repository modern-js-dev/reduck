import { i18n, localeKeys } from "../locale";
export const PackageNameSchema = {
  key: 'packageName',
  label: (_, extra) => extra !== null && extra !== void 0 && extra.isMonorepoSubProject ? i18n.t(localeKeys.packageName.sub_name) : i18n.t(localeKeys.packageName.self),
  type: ['string'],
  when: (_, extra) => Boolean(extra === null || extra === void 0 ? void 0 : extra.isMonorepoSubProject) || !(extra !== null && extra !== void 0 && extra.isMwa),
  validate: value => {
    if (!value) {
      return {
        success: false,
        message: i18n.t(localeKeys.packageName.no_empty)
      };
    }

    return {
      success: true
    };
  }
};