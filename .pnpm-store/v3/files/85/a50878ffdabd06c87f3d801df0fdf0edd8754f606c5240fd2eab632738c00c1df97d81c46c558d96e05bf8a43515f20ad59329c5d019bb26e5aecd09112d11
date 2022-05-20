"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.childNode = void 0;

require("../../ICliConfig");

var _utils = require("../utils");

const childNode = options => {
  const {
    childQuestionHandler
  } = options; // Non-root node is an array

  if (Array.isArray(childQuestionHandler)) {
    return (0, _utils.toPromiseQuestionHandlerLoop)(childQuestionHandler);
  } // Sub-form of the root node


  return async answers => {
    // The root node itself is not a problem, so directly execute the child element problem
    if (childQuestionHandler) {
      await childQuestionHandler(answers);
    }

    return true;
  };
};

exports.childNode = childNode;