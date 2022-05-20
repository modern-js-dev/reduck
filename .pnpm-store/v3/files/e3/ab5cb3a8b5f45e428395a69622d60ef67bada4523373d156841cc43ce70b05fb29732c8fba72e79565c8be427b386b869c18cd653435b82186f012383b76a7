"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkboxNode = void 0;

require("../../ICliConfig");

var _utils = require("../utils");

const checkboxNode = options => {
  const {
    schema,
    nodeInfo,
    prompts,
    inquirer,
    promptModule,
    childNodes
  } = options;
  return async answers => {
    const listHandler = (0, _utils.toPromiseQuestionHandler)({
      schema,
      nodeInfo,
      prompts,
      inquirer,
      promptModule,
      type: 'checkbox'
    });
    const result = await listHandler(answers);

    if (result) {
      const childNodeHandler = (0, _utils.toPromiseQuestionHandlerLoop)(childNodes(answers));
      const childResult = await childNodeHandler(answers);
      return childResult;
    }

    return false;
  };
};

exports.checkboxNode = checkboxNode;