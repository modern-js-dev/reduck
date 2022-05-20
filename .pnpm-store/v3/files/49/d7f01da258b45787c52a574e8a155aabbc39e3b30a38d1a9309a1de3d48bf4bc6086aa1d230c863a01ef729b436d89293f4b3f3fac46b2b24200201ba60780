"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numberNode = void 0;

require("../../ICliConfig");

var _utils = require("../utils");

const numberNode = options => {
  const {
    schema,
    nodeInfo,
    prompts,
    inquirer,
    promptModule
  } = options;
  return (0, _utils.toPromiseQuestionHandler)({
    schema,
    nodeInfo,
    type: 'number',
    inquirer,
    promptModule,
    prompts
  });
};

exports.numberNode = numberNode;