"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formNode = void 0;

require("../../ICliConfig");

var _utils = require("../utils");

const formNode = options => {
  const {
    childQuestionHandler = []
  } = options;
  return (0, _utils.toPromiseQuestionHandlerLoop)(childQuestionHandler);
};

exports.formNode = formNode;