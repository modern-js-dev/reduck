import { GeneratorCore } from '@modern-js/codesmith';
import { npmInstall, yarnInstall, pnpmInstall } from './utils';

export * from './utils';
export class NpmAPI {
  protected readonly generatorCore: GeneratorCore;

  constructor(generatorCore: GeneratorCore) {
    this.generatorCore = generatorCore;
  }

  public npmInstall(cwd: string = this.generatorCore.outputPath) {
    return npmInstall(cwd);
  }

  public yarnInstall(cwd: string = this.generatorCore.outputPath) {
    return yarnInstall(cwd);
  }

  public pnpmInstall(cwd: string = this.generatorCore.outputPath) {
    return pnpmInstall(cwd);
  }
}
