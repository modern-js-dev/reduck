import path from 'path';
import { FsMaterial } from './FsMaterial';
import { Logger } from '@/logger';
import { getPackageInfo, downloadPackage, nodeRequire } from '@/utils';

export class MaterialsManager {
  logger?: Logger;

  registryUrl?: string;

  materialMap: {
    [materialUri: string]: FsMaterial;
  };

  constructor(logger?: Logger, registryUrl?: string) {
    this.logger = logger;
    this.registryUrl = registryUrl;
    this.materialMap = {};
  }

  loadLocalGenerator(generator: string): Promise<FsMaterial> {
    if (!path.isAbsolute(generator)) {
      return Promise.reject(new Error('only support absolute local path'));
    }
    const fsMaterial = new FsMaterial(generator);
    this.materialMap[generator] = fsMaterial;
    return Promise.resolve(fsMaterial);
  }

  async loadRemoteGenerator(generator: string): Promise<FsMaterial> {
    const { name, version } = getPackageInfo(generator);
    const localPath = await downloadPackage(name, version, {
      registryUrl: this.registryUrl,
      install: true,
    });
    const pkgJson = nodeRequire(`${localPath}/package.json`);
    const materialKey = `${pkgJson.name}@${pkgJson.version}`;
    this.materialMap[materialKey] = new FsMaterial(localPath);
    return Promise.resolve(this.materialMap[materialKey]);
  }
}
