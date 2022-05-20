import { i18n, localeKeys } from "../locale";
import { BooleanConfig, BooleanSchemas } from "../common";
export var CDNType;

(function (CDNType) {
  CDNType["OSS"] = "oss";
  CDNType["COS"] = "cos";
  CDNType["NO"] = "no";
})(CDNType || (CDNType = {}));

export var LambdaType;

(function (LambdaType) {
  LambdaType["FC"] = "fc";
  LambdaType["SCF"] = "scf";
  LambdaType["NO"] = "no";
})(LambdaType || (LambdaType = {}));

export var CloudTypeSchema = {
  key: 'disableModernServer',
  type: ['string'],
  label: function label() {
    return i18n.t(localeKeys.deploy.cloud.self);
  },
  mutualExclusion: true,
  state: {
    value: BooleanConfig.NO
  },
  items: BooleanSchemas
};
export var CDNTypeSchema = {
  key: 'cdnType',
  type: ['string'],
  label: function label() {
    return i18n.t(localeKeys.deploy.cdn.self);
  },
  mutualExclusion: true,
  items: Object.values(CDNType).map(function (deployType) {
    return {
      key: deployType,
      label: function label() {
        return i18n.t(localeKeys.deploy.cdn[deployType]);
      }
    };
  })
};
export var LambdaTypeSchema = {
  key: 'lambdaType',
  type: ['string'],
  label: function label() {
    return i18n.t(localeKeys.deploy.lambda.self);
  },
  mutualExclusion: true,
  items: Object.values(LambdaType).map(function (deployType) {
    return {
      key: deployType,
      label: function label() {
        return i18n.t(localeKeys.deploy.lambda[deployType]);
      }
    };
  })
};
export var DeployTypeSchema = {
  key: 'Deploy',
  isObject: true,
  items: [CloudTypeSchema, CDNTypeSchema, LambdaTypeSchema]
};