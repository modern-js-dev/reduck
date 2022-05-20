"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helperPluginUtils = require("@babel/helper-plugin-utils");

var _pluginSyntaxPipelineOperator = require("@babel/plugin-syntax-pipeline-operator");

var _minimalVisitor = require("./minimalVisitor");

var _hackVisitor = require("./hackVisitor");

var _fsharpVisitor = require("./fsharpVisitor");

var _smartVisitor = require("./smartVisitor");

const visitorsPerProposal = {
  minimal: _minimalVisitor.default,
  hack: _hackVisitor.default,
  fsharp: _fsharpVisitor.default,
  smart: _smartVisitor.default
};

var _default = (0, _helperPluginUtils.declare)((api, options) => {
  api.assertVersion(7);
  const {
    proposal
  } = options;

  if (proposal === "smart") {
    console.warn(`The smart-mix pipe operator is deprecated. Use "proposal": "hack" instead.`);
  }

  return {
    name: "proposal-pipeline-operator",
    inherits: _pluginSyntaxPipelineOperator.default,
    visitor: visitorsPerProposal[options.proposal]
  };
});

exports.default = _default;