import { ForgeOptions } from './constants';
import { GeneratorCore } from "../generator";
import { Logger } from "../logger";
import { MaterialsManager } from "../materials";
interface ICreateOptions {
  debug?: boolean;
  logger?: Logger;
  registryUrl?: string;
}
export declare class CodeSmith {
  core?: GeneratorCore;
  materialsManager: MaterialsManager;
  debug: boolean;
  logger: Logger;
  constructor({
    debug,
    logger,
    registryUrl
  }: ICreateOptions);
  forge({
    tasks,
    pwd
  }: ForgeOptions): Promise<void>;
  private runTask;
}
export {};