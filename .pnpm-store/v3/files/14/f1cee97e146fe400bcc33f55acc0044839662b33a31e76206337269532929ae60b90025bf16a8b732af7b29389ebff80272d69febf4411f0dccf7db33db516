import path from 'path';
import { GeneratorCore } from "../generator";
import { Logger } from "../logger";
import { LoggerLevel } from "../logger/constants";
import { MaterialsManager } from "../materials";
import { FsMaterial } from "../materials/FsMaterial";
export class CodeSmith {
  // current mode is debug mode
  constructor({
    debug,
    logger,
    registryUrl
  }) {
    this.core = void 0;
    this.materialsManager = void 0;
    this.debug = false;
    this.logger = void 0;
    this.debug = debug || false;
    this.logger = logger || new Logger(debug ? LoggerLevel.Debug : LoggerLevel.Info);
    this.materialsManager = new MaterialsManager(this.logger, registryUrl);
  }

  async forge({
    tasks,
    pwd
  }) {
    this.core = new GeneratorCore({
      logger: this.logger,
      materialsManager: this.materialsManager,
      outputPath: pwd || process.cwd()
    });
    this.core.addMaterial('default', new FsMaterial(path.resolve(pwd || process.cwd())));

    try {
      for (const task of tasks) {
        await this.runTask(task);
      }
    } catch (e) {
      this.logger.error('run task error:', e);
      throw new Error('run task error');
    }
  }

  async runTask(task) {
    if (!this.core) {
      throw new Error("no core in 'runTask'");
    }

    const {
      generator,
      config
    } = task;
    await this.core.runGenerator(generator, config);
  }

}