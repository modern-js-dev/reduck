"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerSchemas = exports.ServerSchema = exports.MWADefaultServerConfig = void 0;

var _locale = require("../locale");

var _common = require("./common");

const ServerSchemas = [_common.FrameworkSchema];
exports.ServerSchemas = ServerSchemas;
const ServerSchema = {
  key: 'server',
  label: () => _locale.i18n.t(_locale.localeKeys.action.element.server),
  isObject: true,
  items: ServerSchemas
};
exports.ServerSchema = ServerSchema;
const MWADefaultServerConfig = {
  framework: _common.Framework.Express
};
exports.MWADefaultServerConfig = MWADefaultServerConfig;