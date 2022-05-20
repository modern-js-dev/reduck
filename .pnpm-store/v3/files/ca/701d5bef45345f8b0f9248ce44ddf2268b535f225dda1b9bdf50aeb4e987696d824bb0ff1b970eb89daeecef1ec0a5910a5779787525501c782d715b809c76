"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listNode = void 0;

require("../../ICliConfig");

var _utils = require("../utils");

const listNode = options => {
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
      type: 'list'
    });
    const result = await listHandler(answers);

    if (result) {
      const childNodeHandler = (0, _utils.toPromiseQuestionHandlerLoop)(childNodes(answers));
      const childResult = await childNodeHandler(answers);
      return childResult;
    }

    return true;
  };
};

exports.listNode = listNode;