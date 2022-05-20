"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GitAPI = void 0;

var _utils = require("./utils");

class GitAPI {
  constructor(generatorCore, generatorContext) {
    this.generatorCore = void 0;
    this.generatorContext = void 0;
    this.generatorCore = generatorCore;
    this.generatorContext = generatorContext;
  }

  async isInGitRepo(cwd = this.generatorCore.outputPath) {
    const canUse = await (0, _utils.canUseGit)();

    if (canUse) {
      return (0, _utils.isInGitRepo)(cwd);
    }

    throw new Error('git is not found');
  }

  async initGitRepo(cwd = this.generatorCore.outputPath, force = false) {
    const canUse = await (0, _utils.canUseGit)();

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
      await (0, _utils.initGitRepo)(cwd, defaultBranch);
    } catch (e) {
      this.generatorCore.logger.debug('[GitAPI.error]:', e);
      throw e;
    }
  }

  async addAndCommit(commitMessage, cwd = this.generatorCore.outputPath) {
    const canUse = await (0, _utils.canUseGit)();

    if (!canUse) {
      throw new Error('git is not found');
    }

    try {
      await (0, _utils.gitAdd)(cwd);
      await (0, _utils.gitCommit)(cwd, commitMessage);
    } catch (e) {
      this.generatorCore.logger.debug('[GitAPI.error]:', e);
      throw e;
    }
  }

}

exports.GitAPI = GitAPI;