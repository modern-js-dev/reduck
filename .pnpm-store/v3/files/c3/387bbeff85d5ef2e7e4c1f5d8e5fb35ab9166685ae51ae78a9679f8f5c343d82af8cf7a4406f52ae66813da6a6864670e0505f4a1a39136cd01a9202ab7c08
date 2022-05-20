"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CodeSmith = void 0;

var _path = _interopRequireDefault(require("path"));

var _generator = require("../generator");

var _logger = require("../logger");

var _constants = require("../logger/constants");

var _materials = require("../materials");

var _FsMaterial = require("../materials/FsMaterial");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CodeSmith {
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
    this.logger = logger || new _logger.Logger(debug ? _constants.LoggerLevel.Debug : _constants.LoggerLevel.Info);
    this.materialsManager = new _materials.MaterialsManager(this.logger, registryUrl);
  }

  async forge({
    tasks,
    pwd
  }) {
    this.core = new _generator.GeneratorCore({
      logger: this.logger,
      materialsManager: this.materialsManager,
      outputPath: pwd || process.cwd()
    });
    this.core.addMaterial('default', new _FsMaterial.FsMaterial(_path.default.resolve(pwd || process.cwd())));

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

exports.CodeSmith = CodeSmith;