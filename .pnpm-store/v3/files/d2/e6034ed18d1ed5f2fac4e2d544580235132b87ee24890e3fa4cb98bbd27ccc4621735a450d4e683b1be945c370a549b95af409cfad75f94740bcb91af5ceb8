import path from 'path';
import { EventEmitter } from 'events';
import { fs, ora, chalk } from '@modern-js/utils';
import { GeneratorContext, RuntimeCurrent } from './constants';
import { Logger } from '@/logger';
import { ILogger } from '@/logger/constants';
import { MaterialsManager } from '@/materials';
import { FsMaterial } from '@/materials/FsMaterial';
import { nodeRequire } from '@/utils/nodeRequire';
import { getGeneratorDir } from '@/utils/getGeneratorDir';

interface ICreateOptions {
  logger: Logger;
  materialsManager: MaterialsManager;
  outputPath: string;
}

export class GeneratorCore {
  logger: ILogger;

  materialsManager: MaterialsManager;

  outputPath: string;

  output: {
    fs: (
      file: string | number,
      data: any,
      options?: fs.WriteFileOptions | string,
    ) => Promise<void>;
  } = {
    fs: async (file, content, options) => {
      const filePath = path.resolve(this.outputPath, file.toString());
      await fs.mkdirp(path.dirname(filePath));
      await fs.writeFile(filePath, content, options);
    },
  };

  _context: GeneratorContext;

  // event handles, to handle generator lifecycle
  event: EventEmitter;

  constructor({ logger, materialsManager, outputPath }: ICreateOptions) {
    this.logger = logger;
    this.materialsManager = materialsManager;
    this.outputPath = outputPath;
    this.event = new EventEmitter();
    this._context = {
      materials: {},
      config: {},
      data: {},
      current: null,
      ...this.lifeCycleMethod,
    };
  }

  private get lifeCycleMethod() {
    return {
      handleForged: this.handleForged.bind(this),
    };
  }

  private setConfig(config: Record<string, any>) {
    this._context.config = config;
  }

  public addMaterial(key: string, material: FsMaterial) {
    this._context.materials[key] = material;
  }

  private setCurrent(current: RuntimeCurrent | null) {
    this._context.current = current;
  }

  private setOutputPath(outputPath: string) {
    this.outputPath = outputPath;
  }

  private async loadLocalGenerator(generator: string) {
    this.logger.debug(
      '[runGenerator] generator is absolute, using local generator',
    );
    let generatorPkg: FsMaterial;
    let pkgJson: Record<string, any>;
    try {
      const generatorDir = await getGeneratorDir(generator);
      generatorPkg = await this.materialsManager.loadLocalGenerator(
        generatorDir,
      );
    } catch (e) {
      this.logger.debug('load local generator failed:', e);
      return { generatorPkg: null };
    }
    // check package.json file exist
    try {
      pkgJson = nodeRequire(generatorPkg.get('package.json').filePath);
    } catch (e) {
      this.logger.debug('nodeRequire fail:', e);
      this.logger.error('can not require package.json');
      this.logger.warn(
        `generator need a package.json in top directory
check path: ${chalk.blue.underline(
          generator,
        )} exist a package.json file or not`,
      );
      return {
        generatorPkg: null,
      };
    }
    this.logger.debug(`[runGenerator] generator version is ${pkgJson.version}`);
    const materialKey = `${pkgJson.name}@local`;
    this.logger.debug(`[runGenerator] loaded local generator, ${generator}`);
    return {
      generatorPkg,
      pkgJson,
      materialKey,
    };
  }

  private async loadRemoteGenerator(generator: string) {
    this.logger.debug('[runGenerator] task.generator is remote package');
    try {
      const generatorPkg = await this.materialsManager.loadRemoteGenerator(
        generator,
      );
      const pkgJson = nodeRequire(generatorPkg.get('package.json').filePath);
      const materialKey = `${pkgJson.name}@${pkgJson.version}`;
      this.logger.debug(
        `[runTask] loaded remote generator, ${pkgJson.name}@${pkgJson.version}`,
      );
      return { generatorPkg, pkgJson, materialKey };
    } catch (e) {
      this.logger.debug('load remote generator failed:', e);
      this.logger.error(
        `load remote generator failed: Package ${generator} could not be found or get timeout`,
      );
      return { generatorPkg: null };
    }
  }

  // when generator has finish forge template file, can trigger this function to emit `forged` event
  handleForged(
    generatorName: string,
    context: {
      materials: { default: { basePath: string } };
      data: Record<string, unknown>;
      config: Record<string, unknown>;
    },
    // the flag is marked whether need to wait `handle forged success` event
    needWait = false,
    projectPath = '',
  ) {
    if (needWait) {
      this.event.emit(
        `forged`,
        generatorName,
        context.materials.default.basePath,
        { ...context.data, ...context.config },
        projectPath,
        this,
      );
      return new Promise((resolve, reject) => {
        try {
          this.event.on('handle forged success', resolve);
        } catch (e) {
          reject(e);
        }
      });
    }
    return Promise.resolve();
  }

  async loadGenerator(generator: string) {
    const loadGeneratorPromise = path.isAbsolute(generator)
      ? this.loadLocalGenerator(generator)
      : this.loadRemoteGenerator(generator);
    const { generatorPkg, pkgJson, materialKey } = await loadGeneratorPromise;
    if (!generatorPkg || !pkgJson || !materialKey) {
      return {};
    }
    this.logger.debug('[runGenerator] task.generator loaded');

    const generatorScript = nodeRequire(generatorPkg.basePath);
    if (typeof generatorScript !== 'function') {
      this.logger.debug(
        `generator module [${pkgJson.name}] export default is not a function`,
        generatorScript,
      );
      throw new Error(
        `generator module [${pkgJson.name}] export default is not a function`,
      );
    }
    return {
      materialKey,
      generatorPkg,
      generatorScript,
    };
  }

  async runGenerator(generator: string, config: Record<string, unknown> = {}) {
    const spinner = ora('Loading...').start();
    spinner.color = 'yellow';
    const { materialKey, generatorPkg, generatorScript } =
      await this.loadGenerator(generator);
    if (!materialKey || !generatorPkg) {
      throw new Error('load generator failed');
    }
    this.addMaterial(materialKey, generatorPkg);
    this.setConfig(config || {});

    // run generator
    this.setCurrent({
      material: generatorPkg,
    });
    spinner.stop();
    await generatorScript(this._context, this);
    this.setCurrent(null);
  }

  async runSubGenerator(
    subGenerator: string,
    relativePwdPath = '',
    config?: Record<string, any>,
  ) {
    const spinner = ora('Loading...').start();
    spinner.color = 'yellow';
    const { materialKey, generatorPkg, generatorScript } =
      await this.loadGenerator(subGenerator);
    if (!materialKey || !generatorPkg) {
      throw new Error('load generator failed');
    }
    this.addMaterial(materialKey, generatorPkg);
    const subContext = {
      ...this._context,
      config: {
        ...this._context.config,
        ...config,
      },
      materials: {
        ...this._context.materials,
        default: new FsMaterial(path.resolve(this.outputPath, relativePwdPath)),
      },
      current: {
        material: generatorPkg,
      },
    };
    this.logger.debug('subContext', subContext);
    const preOutputPath = this.outputPath;
    this.setOutputPath(path.resolve(this.outputPath, relativePwdPath || ''));
    spinner.stop();
    await generatorScript(subContext, this);
    this.setOutputPath(preOutputPath);
  }
}
