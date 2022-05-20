import { FsMaterial, FsResource, GeneratorCore } from '@modern-js/codesmith';
import handlebars from 'handlebars';
import { renderString } from './utils';
declare type TargetFunction = (globMatch: string) => string;
declare type RenderTemplateDirOptions = {
  nodir?: boolean;
  dot?: boolean;
  ignore?: string | readonly string[];
  parameters?: Record<string, string>;
};
export { renderString };
export declare class HandlebarsAPI {
  protected readonly generatorCore: GeneratorCore;
  protected readonly registers?: {
    helpers: Record<string, handlebars.HelperDelegate>;
    partials: Record<string, handlebars.Template>;
  };
  constructor(generatorCore: GeneratorCore, registers?: {
    helpers: Record<string, handlebars.HelperDelegate>;
    partials: Record<string, handlebars.Template>;
  });
  renderTemplate(templateResource: FsResource, target: string, parameters?: Record<string, string>): Promise<void>;
  renderTemplateDir(material: FsMaterial, findGlob: string, target: TargetFunction, options?: RenderTemplateDirOptions): Promise<void>;
}