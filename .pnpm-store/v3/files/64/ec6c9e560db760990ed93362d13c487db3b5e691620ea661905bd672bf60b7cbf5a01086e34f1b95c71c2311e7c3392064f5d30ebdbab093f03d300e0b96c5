import { i18n, localeKeys } from "../locale";
const PackagePathRegex = new RegExp('^[a-z0-9]*[-_/]?([a-z0-9]*[-_]?[a-z0-9]*)*[-_/]?[a-z0-9-_]+$');
export const PackagePathSchema = {
  key: 'packagePath',
  label: () => i18n.t(localeKeys.packagePath.self),
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
        message: i18n.t(localeKeys.packagePath.no_empty)
      };
    }

    if (!PackagePathRegex.test(value)) {
      return {
        success: false,
        message: i18n.t(localeKeys.packagePath.format)
      };
    }

    return {
      success: true
    };
  }
};