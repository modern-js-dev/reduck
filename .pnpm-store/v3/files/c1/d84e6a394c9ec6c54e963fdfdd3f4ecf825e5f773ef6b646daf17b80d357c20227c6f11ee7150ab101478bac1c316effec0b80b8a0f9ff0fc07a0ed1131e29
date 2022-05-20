"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _store = require("@modern-js-reduck/store");

var _immer = require("immer");

var _default = (0, _store.createPlugin)(() => ({
  beforeReducer(reducer) {
    return (state, payload) => (0, _immer.produce)(state, draft => reducer(draft, payload));
  }

}));

exports.default = _default;