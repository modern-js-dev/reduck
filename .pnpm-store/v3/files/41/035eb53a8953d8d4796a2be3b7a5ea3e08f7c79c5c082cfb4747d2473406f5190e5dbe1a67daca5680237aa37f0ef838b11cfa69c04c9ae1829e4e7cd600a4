import { npmInstall, yarnInstall, pnpmInstall } from "./utils";
export * from "./utils";
export class NpmAPI {
  constructor(generatorCore) {
    this.generatorCore = void 0;
    this.generatorCore = generatorCore;
  }

  npmInstall(cwd = this.generatorCore.outputPath) {
    return npmInstall(cwd);
  }

  yarnInstall(cwd = this.generatorCore.outputPath) {
    return yarnInstall(cwd);
  }

  pnpmInstall(cwd = this.generatorCore.outputPath) {
    return pnpmInstall(cwd);
  }

}