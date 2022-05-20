import { GeneratorCore, GeneratorContext } from '@modern-js/codesmith';
import { Schema } from '@modern-js/easy-form-cli';
import { transformSchema } from './utils/transformSchema';
import { I18n } from "./locale";
export { transformSchema };
export { forEach } from '@modern-js/easy-form-cli';
export declare class AppAPI {
  i18n: I18n;
  protected readonly generatorCore: GeneratorCore;
  protected readonly generatorContext: GeneratorContext;
  private readonly npmApi;
  private readonly gitApi;
  private readonly handlebarsAPI;
  constructor(generatorContext: GeneratorContext, generatorCore: GeneratorCore);
  checkEnvironment(): Promise<boolean>;
  runInstall(command?: string): Promise<void>;
  runGitAndInstall(commitMessage: string, installFunc?: () => Promise<void>): Promise<void>;
  forgeTemplate(templatePattern: string, filter?: (resourceKey: string) => boolean, rename?: (resourceKey: string) => string, parameters?: Record<string, any>): Promise<void>;
  updateWorkspace(folder: {
    name: string;
    path: string;
  }, workspaceName?: string): Promise<void>;
  showSuccessInfo(successInfo?: string): void;
  runSubGenerator(subGenerator: string, relativePwdPath?: string, config?: Record<string, unknown>): Promise<void>;
  /**
   * questions input
   * @param schema Questions schema
   * @param configValue Default config. When the question's key is in configValue, it will not show.
   * @param validateMap Question validate function map
   * @param initValue Initial value. Even the question's key is in initValue, it alse show in question list.
   * @returns
   */

  getInputBySchema(schema: Schema, configValue?: Record<string, unknown>, validateMap?: Record<string, (input: unknown, data?: Record<string, unknown>) => {
    success: boolean;
    error?: string;
  }>, initValue?: Record<string, any>): Promise<Record<string, unknown>>;
}