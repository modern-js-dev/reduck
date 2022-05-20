"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  hook: true
};
exports.hook = void 0;

var _bffRuntime = require("@modern-js/bff-runtime");

Object.keys(_bffRuntime).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _bffRuntime[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _bffRuntime[key];
    }
  });
});

const hook = attacher => attacher;

exports.hook = hook;