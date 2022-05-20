import { i18n, localeKeys } from "../locale";
import { BooleanConfig, BooleanSchemas } from "../common";
export let CDNType;

(function (CDNType) {
  CDNType["OSS"] = "oss";
  CDNType["COS"] = "cos";
  CDNType["NO"] = "no";
})(CDNType || (CDNType = {}));

export let LambdaType;

(function (LambdaType) {
  LambdaType["FC"] = "fc";
  LambdaType["SCF"] = "scf";
  LambdaType["NO"] = "no";
})(LambdaType || (LambdaType = {}));

export const CloudTypeSchema = {
  key: 'disableModernServer',
  type: ['string'],
  label: () => i18n.t(localeKeys.deploy.cloud.self),
  mutualExclusion: true,
  state: {
    value: BooleanConfig.NO
  },
  items: BooleanSchemas
};
export const CDNTypeSchema = {
  key: 'cdnType',
  type: ['string'],
  label: () => i18n.t(localeKeys.deploy.cdn.self),
  mutualExclusion: true,
  items: Object.values(CDNType).map(deployType => ({
    key: deployType,
    label: () => i18n.t(localeKeys.deploy.cdn[deployType])
  }))
};
export const LambdaTypeSchema = {
  key: 'lambdaType',
  type: ['string'],
  label: () => i18n.t(localeKeys.deploy.lambda.self),
  mutualExclusion: true,
  items: Object.values(LambdaType).map(deployType => ({
    key: deployType,
    label: () => i18n.t(localeKeys.deploy.lambda[deployType])
  }))
};
export const DeployTypeSchema = {
  key: 'Deploy',
  isObject: true,
  items: [CloudTypeSchema, CDNTypeSchema, LambdaTypeSchema]
};