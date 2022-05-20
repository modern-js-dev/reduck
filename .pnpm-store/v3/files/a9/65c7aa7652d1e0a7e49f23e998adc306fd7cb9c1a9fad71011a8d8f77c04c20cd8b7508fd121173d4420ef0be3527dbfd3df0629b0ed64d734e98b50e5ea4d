import { GeneratorContext, GeneratorCore } from '@modern-js/codesmith';
import {
  canUseGit,
  isInGitRepo,
  initGitRepo,
  gitAdd,
  gitCommit,
} from './utils';

export class GitAPI {
  protected readonly generatorCore: GeneratorCore;

  protected readonly generatorContext?: GeneratorContext;

  constructor(
    generatorCore: GeneratorCore,
    generatorContext?: GeneratorContext,
  ) {
    this.generatorCore = generatorCore;
    this.generatorContext = generatorContext;
  }

  public async isInGitRepo(cwd: string = this.generatorCore.outputPath) {
    const canUse = await canUseGit();
    if (canUse) {
      return isInGitRepo(cwd);
    }
    throw new Error('git is not found');
  }

  public async initGitRepo(cwd = this.generatorCore.outputPath, force = false) {
    const canUse = await canUseGit();
    if (!canUse) {
      throw new Error('git is not found');
    }
    const alreadyInit = await this.isInGitRepo(cwd);
    if (alreadyInit && !force) {
      this.generatorCore.logger.debug('already in a git repo, skip init');
      return;
    }
    try {
      const {
        config: { defaultBranch = 'master' },
      } = this.generatorContext || { config: { defaultBranch: 'master' } };
      await initGitRepo(cwd, defaultBranch);
    } catch (e) {
      this.generatorCore.logger.debug('[GitAPI.error]:', e);
      throw e;
    }
  }

  public async addAndCommit(
    commitMessage: string,
    cwd = this.generatorCore.outputPath,
  ) {
    const canUse = await canUseGit();
    if (!canUse) {
      throw new Error('git is not found');
    }
    try {
      await gitAdd(cwd);
      await gitCommit(cwd, commitMessage);
    } catch (e) {
      this.generatorCore.logger.debug('[GitAPI.error]:', e);
      throw e;
    }
  }
}
