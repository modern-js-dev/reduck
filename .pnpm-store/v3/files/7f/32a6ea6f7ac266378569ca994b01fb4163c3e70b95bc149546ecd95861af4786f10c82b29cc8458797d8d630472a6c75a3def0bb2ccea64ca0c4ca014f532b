"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Server", {
  enumerable: true,
  get: function () {
    return _server.DevServer;
  }
});
exports.default = void 0;

var _server = require("./server");

var _default = options => {
  if (options == null) {
    throw new Error('can not start mserver without options');
  }

  const server = new _server.DevServer(options);
  return server.init();
};

exports.default = _default;