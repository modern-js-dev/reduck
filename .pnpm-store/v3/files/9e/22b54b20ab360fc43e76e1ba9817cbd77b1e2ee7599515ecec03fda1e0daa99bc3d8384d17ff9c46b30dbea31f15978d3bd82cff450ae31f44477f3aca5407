import { canUseGit, isInGitRepo, initGitRepo, gitAdd, gitCommit } from "./utils";
export class GitAPI {
  constructor(generatorCore, generatorContext) {
    this.generatorCore = void 0;
    this.generatorContext = void 0;
    this.generatorCore = generatorCore;
    this.generatorContext = generatorContext;
  }

  async isInGitRepo(cwd = this.generatorCore.outputPath) {
    const canUse = await canUseGit();

    if (canUse) {
      return isInGitRepo(cwd);
    }

    throw new Error('git is not found');
  }

  async initGitRepo(cwd = this.generatorCore.outputPath, force = false) {
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
        config: {
          defaultBranch = 'master'
        }
      } = this.generatorContext || {
        config: {
          defaultBranch: 'master'
        }
      };
      await initGitRepo(cwd, defaultBranch);
    } catch (e) {
      this.generatorCore.logger.debug('[GitAPI.error]:', e);
      throw e;
    }
  }

  async addAndCommit(commitMessage, cwd = this.generatorCore.outputPath) {
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