"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandlebarsAPI = void 0;
Object.defineProperty(exports, "renderString", {
  enumerable: true,
  get: function () {
    return _utils.renderString;
  }
});

var _codesmith = require("@modern-js/codesmith");

var _utils = require("./utils");

class HandlebarsAPI {
  constructor(generatorCore, registers) {
    this.generatorCore = void 0;
    this.registers = void 0;
    this.generatorCore = generatorCore;
    this.registers = registers || {
      helpers: {},
      partials: {}
    };
  }

  async renderTemplate(templateResource, target, parameters = {}) {
    if (templateResource._type !== _codesmith.FS_RESOURCE) {
      throw new Error('resource not match');
    }

    const resourceValue = await templateResource.value();

    if (typeof resourceValue.content !== 'string') {
      throw new Error(`resource.value is not string, resourceValue=${resourceValue}`);
    }

    await this.generatorCore.output.fs(target, (0, _utils.renderString)(resourceValue.content, parameters, this.registers), {
      encoding: 'utf-8'
    });
  }

  async renderTemplateDir(material, findGlob, target, options) {
    const resourceMap = await material.find(findGlob, options);
    await Promise.all( // resourceKey is relate path. example: in `garr-master/package.json`, package.json is resourceKey
    Object.keys(resourceMap).map(async resourceKey => {
      this.generatorCore.logger.debug(`[renderDir] resourceKey=${resourceKey}`);
      await this.renderTemplate(material.get(resourceKey), target(resourceKey), options === null || options === void 0 ? void 0 : options.parameters);
    }));
  }

}

exports.HandlebarsAPI = HandlebarsAPI;