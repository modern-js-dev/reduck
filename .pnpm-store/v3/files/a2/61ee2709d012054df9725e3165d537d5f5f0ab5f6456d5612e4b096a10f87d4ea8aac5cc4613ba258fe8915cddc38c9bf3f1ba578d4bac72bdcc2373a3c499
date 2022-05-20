"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaterialsManager = void 0;

var _path = _interopRequireDefault(require("path"));

var _FsMaterial = require("./FsMaterial");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MaterialsManager {
  constructor(logger, registryUrl) {
    this.logger = void 0;
    this.registryUrl = void 0;
    this.materialMap = void 0;
    this.logger = logger;
    this.registryUrl = registryUrl;
    this.materialMap = {};
  }

  loadLocalGenerator(generator) {
    if (!_path.default.isAbsolute(generator)) {
      return Promise.reject(new Error('only support absolute local path'));
    }

    const fsMaterial = new _FsMaterial.FsMaterial(generator);
    this.materialMap[generator] = fsMaterial;
    return Promise.resolve(fsMaterial);
  }

  async loadRemoteGenerator(generator) {
    const {
      name,
      version
    } = (0, _utils.getPackageInfo)(generator);
    const localPath = await (0, _utils.downloadPackage)(name, version, {
      registryUrl: this.registryUrl,
      install: true
    });
    const pkgJson = (0, _utils.nodeRequire)(`${localPath}/package.json`);
    const materialKey = `${pkgJson.name}@${pkgJson.version}`;
    this.materialMap[materialKey] = new _FsMaterial.FsMaterial(localPath);
    return Promise.resolve(this.materialMap[materialKey]);
  }

}

exports.MaterialsManager = MaterialsManager;