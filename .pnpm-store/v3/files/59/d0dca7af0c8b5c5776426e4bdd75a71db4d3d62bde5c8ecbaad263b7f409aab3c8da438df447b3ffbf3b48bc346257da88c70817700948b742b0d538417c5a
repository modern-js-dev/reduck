import path from 'path';
import { ForgeOptions, ForgeTask } from './constants';
import { GeneratorCore } from '@/generator';
import { Logger } from '@/logger';
import { LoggerLevel } from '@/logger/constants';
import { MaterialsManager } from '@/materials';
import { FsMaterial } from '@/materials/FsMaterial';

interface ICreateOptions {
  debug?: boolean;
  logger?: Logger;
  // custom npm registry
  registryUrl?: string;
}

export class CodeSmith {
  core?: GeneratorCore;

  materialsManager: MaterialsManager;

  // current mode is debug mode
  debug: boolean = false;

  logger: Logger;

  constructor({ debug, logger, registryUrl }: ICreateOptions) {
    this.debug = debug || false;
    this.logger =
      logger || new Logger(debug ? LoggerLevel.Debug : LoggerLevel.Info);
    this.materialsManager = new MaterialsManager(this.logger, registryUrl);
  }

  public async forge({ tasks, pwd }: ForgeOptions) {
    this.core = new GeneratorCore({
      logger: this.logger,
      materialsManager: this.materialsManager,
      outputPath: pwd || process.cwd(),
    });
    this.core.addMaterial(
      'default',
      new FsMaterial(path.resolve(pwd || process.cwd())),
    );
    try {
      for (const task of tasks) {
        await this.runTask(task);
      }
    } catch (e: unknown) {
      this.logger.error('run task error:', e);
      throw new Error('run task error');
    }
  }

  private async runTask(task: ForgeTask) {
    if (!this.core) {
      throw new Error("no core in 'runTask'");
    }
    const { generator, config } = task;
    await this.core.runGenerator(generator, config);
  }
}
