import path from 'path';
import { FsMaterial } from "./FsMaterial";
import { getPackageInfo, downloadPackage, nodeRequire } from "../utils";
export class MaterialsManager {
  constructor(logger, registryUrl) {
    this.logger = void 0;
    this.registryUrl = void 0;
    this.materialMap = void 0;
    this.logger = logger;
    this.registryUrl = registryUrl;
    this.materialMap = {};
  }

  loadLocalGenerator(generator) {
    if (!path.isAbsolute(generator)) {
      return Promise.reject(new Error('only support absolute local path'));
    }

    const fsMaterial = new FsMaterial(generator);
    this.materialMap[generator] = fsMaterial;
    return Promise.resolve(fsMaterial);
  }

  async loadRemoteGenerator(generator) {
    const {
      name,
      version
    } = getPackageInfo(generator);
    const localPath = await downloadPackage(name, version, {
      registryUrl: this.registryUrl,
      install: true
    });
    const pkgJson = nodeRequire(`${localPath}/package.json`);
    const materialKey = `${pkgJson.name}@${pkgJson.version}`;
    this.materialMap[materialKey] = new FsMaterial(localPath);
    return Promise.resolve(this.materialMap[materialKey]);
  }

}