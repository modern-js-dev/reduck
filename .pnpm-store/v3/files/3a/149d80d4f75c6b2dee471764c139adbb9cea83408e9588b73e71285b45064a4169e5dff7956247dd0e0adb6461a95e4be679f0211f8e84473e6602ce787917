"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevServer = void 0;

var _prodServer = require("@modern-js/prod-server");

var _devServer = require("./dev-server");

var _devServerSplit = require("./dev-server-split");

const createDevServer = options => {
  if (options.apiOnly) {
    return new _devServerSplit.ModernAPIDevServer(options);
  } else if (options.ssrOnly) {
    return new _devServerSplit.ModernSSRDevServer(options);
  } else {
    return new _devServer.ModernDevServer(options);
  }
};

class DevServer extends _prodServer.Server {
  constructor(options) {
    super(options);

    if (options.dev) {
      this.serverImpl = createDevServer;
    }
  }

}

exports.DevServer = DevServer;