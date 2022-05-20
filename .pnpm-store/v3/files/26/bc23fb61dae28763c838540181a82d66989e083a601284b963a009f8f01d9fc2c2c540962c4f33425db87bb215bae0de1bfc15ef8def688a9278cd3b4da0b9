"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inputNode = void 0;

require("../../ICliConfig");

var _utils = require("../utils");

const inputNode = options => {
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
    type: 'input',
    inquirer,
    promptModule,
    prompts
  });
};

exports.inputNode = inputNode;