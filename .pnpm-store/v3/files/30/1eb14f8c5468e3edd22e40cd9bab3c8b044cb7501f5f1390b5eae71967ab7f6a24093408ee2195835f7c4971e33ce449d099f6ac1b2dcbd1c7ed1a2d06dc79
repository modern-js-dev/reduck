"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonorepoNewActionSchema = exports.MonorepoNewActionConfig = void 0;

var _common = require("../../common");

const MonorepoNewActionSchema = {
  key: 'monorepo_new_action',
  isObject: true,
  items: [_common.SubSolutionSchema]
};
exports.MonorepoNewActionSchema = MonorepoNewActionSchema;
const MonorepoNewActionConfig = {
  [_common.SubSolution.MWA]: {
    isMonorepoSubProject: true,
    isTest: false
  },
  [_common.SubSolution.MWATest]: {
    isMonorepoSubProject: true,
    isTest: true
  },
  [_common.SubSolution.Module]: {
    isMonorepoSubProject: true,
    isPublic: true
  },
  [_common.SubSolution.InnerModule]: {
    isMonorepoSubProject: true,
    isPublic: false
  }
};
exports.MonorepoNewActionConfig = MonorepoNewActionConfig;