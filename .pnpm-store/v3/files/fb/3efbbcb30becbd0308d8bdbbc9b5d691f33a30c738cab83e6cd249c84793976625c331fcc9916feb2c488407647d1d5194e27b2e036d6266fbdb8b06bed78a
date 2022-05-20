"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  NpmAPI: true
};
exports.NpmAPI = void 0;

var _utils = require("./utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _utils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _utils[key];
    }
  });
});

class NpmAPI {
  constructor(generatorCore) {
    this.generatorCore = void 0;
    this.generatorCore = generatorCore;
  }

  npmInstall(cwd = this.generatorCore.outputPath) {
    return (0, _utils.npmInstall)(cwd);
  }

  yarnInstall(cwd = this.generatorCore.outputPath) {
    return (0, _utils.yarnInstall)(cwd);
  }

  pnpmInstall(cwd = this.generatorCore.outputPath) {
    return (0, _utils.pnpmInstall)(cwd);
  }

}

exports.NpmAPI = NpmAPI;