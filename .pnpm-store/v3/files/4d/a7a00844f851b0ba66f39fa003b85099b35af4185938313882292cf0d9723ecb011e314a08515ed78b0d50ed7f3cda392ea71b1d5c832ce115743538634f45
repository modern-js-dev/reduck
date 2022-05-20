"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialRuntime = void 0;

var _plugin = require("./plugin");

var _wrap = require("./wrap");

var _render = require("./render");

const initialRuntime = (plugins, manager = _plugin.runtime) => ({
  wrap: (0, _wrap.initialWrapper)(plugins, manager),
  render: (0, _render.initialRender)(plugins, manager)
});

exports.initialRuntime = initialRuntime;