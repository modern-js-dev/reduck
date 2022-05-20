import { GeneratorContext, GeneratorCore } from '@modern-js/codesmith';
export declare class GitAPI {
  protected readonly generatorCore: GeneratorCore;
  protected readonly generatorContext?: GeneratorContext;
  constructor(generatorCore: GeneratorCore, generatorContext?: GeneratorContext);
  isInGitRepo(cwd?: string): Promise<boolean>;
  initGitRepo(cwd?: string, force?: boolean): Promise<void>;
  addAndCommit(commitMessage: string, cwd?: string): Promise<void>;
}