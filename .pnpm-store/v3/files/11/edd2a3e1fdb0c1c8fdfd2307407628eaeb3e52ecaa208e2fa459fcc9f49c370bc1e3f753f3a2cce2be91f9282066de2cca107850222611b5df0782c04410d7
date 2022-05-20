import { i18n, localeKeys } from "../locale";
var PackagePathRegex = new RegExp('^[a-z0-9]*[-_/]?([a-z0-9]*[-_]?[a-z0-9]*)*[-_/]?[a-z0-9-_]+$');
export var PackagePathSchema = {
  key: 'packagePath',
  label: function label() {
    return i18n.t(localeKeys.packagePath.self);
  },
  type: ['string'],
  when: function when(_, extra) {
    return Boolean(extra === null || extra === void 0 ? void 0 : extra.isMonorepoSubProject);
  },
  state: {
    value: {
      effectedByFields: ['packageName'],
      action: function action(data) {
        return "".concat(data.packageName || '');
      }
    }
  },
  validate: function validate(value) {
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