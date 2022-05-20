"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkSource = void 0;

var _esModuleLexer = require("es-module-lexer");

var _result = require("./result");

const checkSource = async source => {
  await _esModuleLexer.init;
  const [, exports] = (0, _esModuleLexer.parse)(source);
  const handlers = [];

  if (exports.length === 0) {
    return (0, _result.Err)('Without any export item, Expect one at least');
  }

  exports.forEach(item => {
    handlers.push(item);
  });
  return (0, _result.Ok)(handlers);
};

exports.checkSource = checkSource;