import { fs, execa, semver } from '@modern-js/utils';
import { merge } from 'lodash';
import { parse, stringify } from 'comment-json';
import { GeneratorCore, GeneratorContext } from '@modern-js/codesmith';
import {
  NpmAPI,
  canUsePnpm,
  canUseYarn,
  canUseNpm,
} from '@modern-js/codesmith-api-npm';
import { GitAPI } from '@modern-js/codesmith-api-git';
import { HandlebarsAPI } from '@modern-js/codesmith-api-handlebars';
import {
  Schema,
  setInitValues,
  CliReader,
  setCliQuestionsHandlers,
} from '@modern-js/easy-form-cli';

import { transformSchema } from './utils/transformSchema';
import * as handlers from './handlers';
import { I18n, i18n, localeKeys } from '@/locale';

export { transformSchema };
export { forEach } from '@modern-js/easy-form-cli';

setCliQuestionsHandlers(handlers);

export class AppAPI {
  i18n: I18n = i18n;

  protected readonly generatorCore: GeneratorCore;

  protected readonly generatorContext: GeneratorContext;

  private readonly npmApi: NpmAPI;

  private readonly gitApi: GitAPI;

  private readonly handlebarsAPI: HandlebarsAPI;

  constructor(
    generatorContext: GeneratorContext,
    generatorCore: GeneratorCore,
  ) {
    this.generatorCore = generatorCore;
    this.generatorContext = generatorContext;
    this.npmApi = new NpmAPI(generatorCore);
    this.gitApi = new GitAPI(generatorCore, generatorContext);
    this.handlebarsAPI = new HandlebarsAPI(this.generatorCore);
  }

  public async checkEnvironment() {
    if (semver.lt(process.versions.node, '12.17.0')) {
      this.generatorCore.logger.warn(
        i18n.t(localeKeys.environment.node_version),
      );
      return false;
    }
    if (
      !(await canUseYarn()) &&
      !(await canUsePnpm()) &&
      !(await canUseNpm())
    ) {
      this.generatorCore.logger.debug("can't use yarn or pnpm or npm");
      this.generatorCore.logger.warn(
        i18n.t(localeKeys.environment.yarn_pnpm_npm),
      );
      return false;
    }
    return true;
  }

  // support custom install command
  public async runInstall(command?: string) {
    const {
      config: { packageManager, noNeedInstall },
    } = this.generatorContext;
    if (noNeedInstall || process.env.NoNeedInstall === 'true') {
      return;
    }
    // const spinner = ora('Install...').start();
    // spinner.color = 'yellow';
    // try {
    let intallPromise;
    if (command) {
      intallPromise = execa(command);
    } else if (packageManager === 'pnpm') {
      intallPromise = this.npmApi.pnpmInstall();
    } else if (packageManager === 'yarn') {
      intallPromise = this.npmApi.yarnInstall();
    } else {
      intallPromise = this.npmApi.npmInstall();
    }
    try {
      await intallPromise;
      this.generatorCore.logger.info(i18n.t(localeKeys.install.success));
    } catch (e) {
      this.generatorCore.logger.warn(
        i18n.t(localeKeys.install.failed, {
          command: command || `${packageManager} install`,
        }),
      );
    }

    // spinner.stop();

    // } catch (e) {
    //   // spinner.stop();
    //   throw e;
    // }
  }

  // custom install func
  public async runGitAndInstall(
    commitMessage: string,
    installFunc?: () => Promise<void>,
  ) {
    const {
      config: { isMonorepoSubProject = false },
    } = this.generatorContext;
    const inGitRepo = isMonorepoSubProject || (await this.gitApi.isInGitRepo());

    if (!inGitRepo) {
      await this.gitApi.initGitRepo();
    }

    try {
      if (installFunc) {
        await installFunc();
      } else {
        await this.runInstall();
      }
    } catch (e) {
      this.generatorCore.logger.debug('Dependencies install failed', e);
      this.generatorCore.logger.warn(
        i18n.t(localeKeys.install.failed_no_command),
      );
    }

    try {
      if (!isMonorepoSubProject) {
        await this.gitApi.addAndCommit(commitMessage || 'feat: init');
        this.generatorCore.logger.info(i18n.t(localeKeys.git.success));
      }
    } catch (e) {
      this.generatorCore.logger.debug('Git repository create failed', e);
      this.generatorCore.logger.warn(i18n.t(localeKeys.git.failed));
    }
  }

  public async forgeTemplate(
    templatePattern: string,
    filter?: (resourceKey: string) => boolean,
    rename?: (resourceKey: string) => string,
    parameters?: Record<string, any>,
  ) {
    try {
      const { material } = this.generatorContext.current!;
      const resourceMap = await material.find(templatePattern, {
        nodir: true,
        dot: true,
      });
      if (resourceMap) {
        await Promise.all(
          Object.keys(resourceMap)
            .filter(resourceKey => (filter ? filter(resourceKey) : true))
            .map(async resourceKey => {
              this.generatorCore.logger.debug(
                `[renderDir] resourceKey=${resourceKey}`,
              );
              const target = rename
                ? rename(resourceKey)
                : resourceKey
                    .replace(`templates/`, '')
                    .replace('.handlebars', '');
              await this.handlebarsAPI.renderTemplate(
                material.get(resourceKey),
                target,
                {
                  ...(this.generatorContext.data || {}),
                  ...(parameters || {}),
                },
              );
            }),
        );
      }
    } catch (e) {
      this.generatorCore.logger.debug('base forging failed:', e);
      this.generatorCore.logger.warn(i18n.t(localeKeys.templated.failed));
      throw new Error('base forging failed');
    }
  }

  public async updateWorkspace(
    folder: {
      name: string;
      path: string;
    },
    workspaceName = 'monorepo.code-workspace',
  ) {
    const { filePath } =
      this.generatorContext.materials.default.get(workspaceName);

    if (!fs.existsSync(filePath)) {
      return;
    }

    const content = await fs.readFile(filePath);
    const workspace = parse(content.toString()) as Record<string, any>;
    workspace.folders = [folder, ...(workspace.folders || [])];
    const indent = 2;
    await fs.writeFile(filePath, stringify(workspace, null, indent), {
      encoding: 'utf-8',
    });
  }

  public showSuccessInfo(successInfo?: string) {
    this.generatorCore.logger.info(
      successInfo || i18n.t(localeKeys.success.info),
    );
  }

  public async runSubGenerator(
    subGenerator: string,
    relativePwdPath?: string,
    config?: Record<string, unknown>,
  ) {
    try {
      await this.generatorCore.runSubGenerator(
        subGenerator,
        relativePwdPath,
        config,
      );
    } catch (e) {
      this.generatorCore.logger.warn(i18n.t(localeKeys.generator.failed));
      this.generatorCore.logger.debug(i18n.t(localeKeys.generator.failed), e);
      throw new Error('run sub generator failed');
    }
  }

  /**
   * questions input
   * @param schema Questions schema
   * @param configValue Default config. When the question's key is in configValue, it will not show.
   * @param validateMap Question validate function map
   * @param initValue Initial value. Even the question's key is in initValue, it alse show in question list.
   * @returns
   */
  public async getInputBySchema(
    schema: Schema,
    configValue: Record<string, unknown> = {},
    validateMap: Record<
      string,
      (
        input: unknown,
        data?: Record<string, unknown>,
      ) => { success: boolean; error?: string }
    > = {},
    initValue: Record<string, any> = {},
  ) {
    transformSchema(schema, configValue, validateMap);
    const reader = new CliReader({
      schema: setInitValues(schema, initValue),
      extra: configValue,
    });
    return new Promise<Record<string, unknown>>((resolve, reject) => {
      reader.startQuestion({
        onComplete: (answers: Record<string, unknown>) => {
          const inputData = merge(answers, configValue);
          this.generatorContext.config = merge(
            this.generatorContext.config,
            inputData,
          );
          resolve(inputData);
        },
        onError: (error: any) => {
          reject(error);
        },
      });
    });
  }
}
