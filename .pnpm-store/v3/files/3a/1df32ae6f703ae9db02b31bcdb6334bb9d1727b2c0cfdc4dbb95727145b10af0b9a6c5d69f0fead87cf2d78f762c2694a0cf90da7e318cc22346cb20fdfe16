import {
  FsMaterial,
  FsResource,
  FS_RESOURCE,
  GeneratorCore,
} from '@modern-js/codesmith';
import handlebars from 'handlebars';
import { renderString } from './utils';

type TargetFunction = (globMatch: string) => string;

type RenderTemplateDirOptions = {
  nodir?: boolean;
  dot?: boolean;
  ignore?: string | readonly string[];
  parameters?: Record<string, string>;
};

export { renderString };

export class HandlebarsAPI {
  protected readonly generatorCore: GeneratorCore;

  protected readonly registers?: {
    helpers: Record<string, handlebars.HelperDelegate>;
    partials: Record<string, handlebars.Template>;
  };

  constructor(
    generatorCore: GeneratorCore,
    registers?: {
      helpers: Record<string, handlebars.HelperDelegate>;
      partials: Record<string, handlebars.Template>;
    },
  ) {
    this.generatorCore = generatorCore;
    this.registers = registers || { helpers: {}, partials: {} };
  }

  public async renderTemplate(
    templateResource: FsResource,
    target: string,
    parameters: Record<string, string> = {},
  ) {
    if (templateResource._type !== FS_RESOURCE) {
      throw new Error('resource not match');
    }
    const resourceValue = await templateResource.value();
    if (typeof resourceValue.content !== 'string') {
      throw new Error(
        `resource.value is not string, resourceValue=${
          resourceValue as unknown as string
        }`,
      );
    }
    await this.generatorCore.output.fs(
      target,
      renderString(resourceValue.content, parameters, this.registers),
      { encoding: 'utf-8' },
    );
  }

  public async renderTemplateDir(
    material: FsMaterial,
    findGlob: string,
    target: TargetFunction,
    options?: RenderTemplateDirOptions,
  ) {
    const resourceMap = await material.find(findGlob, options);
    await Promise.all(
      // resourceKey is relate path. example: in `garr-master/package.json`, package.json is resourceKey
      Object.keys(resourceMap).map(async resourceKey => {
        this.generatorCore.logger.debug(
          `[renderDir] resourceKey=${resourceKey}`,
        );
        await this.renderTemplate(
          material.get(resourceKey),
          target(resourceKey),
          options?.parameters,
        );
      }),
    );
  }
}
