"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Server: true,
  ModernServer: true,
  createProxyHandler: true
};
Object.defineProperty(exports, "ModernServer", {
  enumerable: true,
  get: function () {
    return _modernServer.ModernServer;
  }
});
Object.defineProperty(exports, "Server", {
  enumerable: true,
  get: function () {
    return _server.Server;
  }
});
Object.defineProperty(exports, "createProxyHandler", {
  enumerable: true,
  get: function () {
    return _proxy.createProxyHandler;
  }
});
exports.default = void 0;

var _server = require("./server");

var _modernServer = require("./server/modern-server");

var _proxy = require("./libs/proxy");

var _type = require("./type");

Object.keys(_type).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _type[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _type[key];
    }
  });
});

var _constants = require("./constants");

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _constants[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _constants[key];
    }
  });
});

var _default = options => {
  if (options == null) {
    throw new Error('can not start mserver without options');
  }

  const server = new _server.Server(options);
  return server.init();
};

exports.default = _default;