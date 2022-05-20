import { FS_RESOURCE } from '@modern-js/codesmith';
import { renderString } from "./utils";
export { renderString };
export class HandlebarsAPI {
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
    if (templateResource._type !== FS_RESOURCE) {
      throw new Error('resource not match');
    }

    const resourceValue = await templateResource.value();

    if (typeof resourceValue.content !== 'string') {
      throw new Error(`resource.value is not string, resourceValue=${resourceValue}`);
    }

    await this.generatorCore.output.fs(target, renderString(resourceValue.content, parameters, this.registers), {
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