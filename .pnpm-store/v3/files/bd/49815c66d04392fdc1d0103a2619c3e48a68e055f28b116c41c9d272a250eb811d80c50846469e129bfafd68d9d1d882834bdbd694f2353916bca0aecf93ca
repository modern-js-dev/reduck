"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _store = require("@modern-js-reduck/store");

var _reduxDevtoolsExtension = require("redux-devtools-extension");

var _default = config => (0, _store.createPlugin)(() => ({
  config: storeConfig => {
    const {
      enhancers = []
    } = storeConfig;
    storeConfig.enhancers = [(0, _reduxDevtoolsExtension.devToolsEnhancer)(config), ...enhancers];
    return storeConfig;
  }
}));

exports.default = _default;