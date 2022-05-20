"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LambdaTypeSchema = exports.LambdaType = exports.DeployTypeSchema = exports.CloudTypeSchema = exports.CDNTypeSchema = exports.CDNType = void 0;

var _locale = require("../locale");

var _common = require("../common");

let CDNType;
exports.CDNType = CDNType;

(function (CDNType) {
  CDNType["OSS"] = "oss";
  CDNType["COS"] = "cos";
  CDNType["NO"] = "no";
})(CDNType || (exports.CDNType = CDNType = {}));

let LambdaType;
exports.LambdaType = LambdaType;

(function (LambdaType) {
  LambdaType["FC"] = "fc";
  LambdaType["SCF"] = "scf";
  LambdaType["NO"] = "no";
})(LambdaType || (exports.LambdaType = LambdaType = {}));

const CloudTypeSchema = {
  key: 'disableModernServer',
  type: ['string'],
  label: () => _locale.i18n.t(_locale.localeKeys.deploy.cloud.self),
  mutualExclusion: true,
  state: {
    value: _common.BooleanConfig.NO
  },
  items: _common.BooleanSchemas
};
exports.CloudTypeSchema = CloudTypeSchema;
const CDNTypeSchema = {
  key: 'cdnType',
  type: ['string'],
  label: () => _locale.i18n.t(_locale.localeKeys.deploy.cdn.self),
  mutualExclusion: true,
  items: Object.values(CDNType).map(deployType => ({
    key: deployType,
    label: () => _locale.i18n.t(_locale.localeKeys.deploy.cdn[deployType])
  }))
};
exports.CDNTypeSchema = CDNTypeSchema;
const LambdaTypeSchema = {
  key: 'lambdaType',
  type: ['string'],
  label: () => _locale.i18n.t(_locale.localeKeys.deploy.lambda.self),
  mutualExclusion: true,
  items: Object.values(LambdaType).map(deployType => ({
    key: deployType,
    label: () => _locale.i18n.t(_locale.localeKeys.deploy.lambda[deployType])
  }))
};
exports.LambdaTypeSchema = LambdaTypeSchema;
const DeployTypeSchema = {
  key: 'Deploy',
  isObject: true,
  items: [CloudTypeSchema, CDNTypeSchema, LambdaTypeSchema]
};
exports.DeployTypeSchema = DeployTypeSchema;