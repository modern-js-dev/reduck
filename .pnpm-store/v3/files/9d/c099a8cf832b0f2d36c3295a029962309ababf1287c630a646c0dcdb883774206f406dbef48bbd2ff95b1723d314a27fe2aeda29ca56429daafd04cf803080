"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  LoggerLevel: true,
  LevelPriority: true,
  Logger: true,
  CodeSmith: true,
  GeneratorCore: true,
  MaterialsManager: true,
  FsMaterial: true,
  FsResource: true,
  FS_RESOURCE: true
};
Object.defineProperty(exports, "CodeSmith", {
  enumerable: true,
  get: function () {
    return _codesmith.CodeSmith;
  }
});
Object.defineProperty(exports, "FS_RESOURCE", {
  enumerable: true,
  get: function () {
    return _FsResource.FS_RESOURCE;
  }
});
Object.defineProperty(exports, "FsMaterial", {
  enumerable: true,
  get: function () {
    return _FsMaterial.FsMaterial;
  }
});
Object.defineProperty(exports, "FsResource", {
  enumerable: true,
  get: function () {
    return _FsResource.FsResource;
  }
});
Object.defineProperty(exports, "GeneratorCore", {
  enumerable: true,
  get: function () {
    return _generator.GeneratorCore;
  }
});
Object.defineProperty(exports, "LevelPriority", {
  enumerable: true,
  get: function () {
    return _constants.LevelPriority;
  }
});
Object.defineProperty(exports, "Logger", {
  enumerable: true,
  get: function () {
    return _logger.Logger;
  }
});
Object.defineProperty(exports, "LoggerLevel", {
  enumerable: true,
  get: function () {
    return _constants.LoggerLevel;
  }
});
Object.defineProperty(exports, "MaterialsManager", {
  enumerable: true,
  get: function () {
    return _materials.MaterialsManager;
  }
});

var _constants = require("./logger/constants");

var _logger = require("./logger");

var _codesmith = require("./codesmith");

var _generator = require("./generator");

var _materials = require("./materials");

var _FsMaterial = require("./materials/FsMaterial");

var _FsResource = require("./materials/FsResource");

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