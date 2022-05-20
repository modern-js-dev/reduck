"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootNode = void 0;

require("../../ICliConfig");

const rootNode = options => {
  const {
    childQuestionHandler,
    prompts
  } = options;
  return async answers => {
    if (childQuestionHandler) {
      await childQuestionHandler(answers);
    }

    prompts.complete();
    return true;
  };
};

exports.rootNode = rootNode;