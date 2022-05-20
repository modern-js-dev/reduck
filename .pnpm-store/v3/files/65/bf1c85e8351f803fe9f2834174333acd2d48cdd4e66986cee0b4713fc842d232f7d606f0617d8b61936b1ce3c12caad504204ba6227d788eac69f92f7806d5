import { FsMaterial } from './FsMaterial';
import { Logger } from "../logger";
export declare class MaterialsManager {
  logger?: Logger;
  registryUrl?: string;
  materialMap: {
    [materialUri: string]: FsMaterial;
  };
  constructor(logger?: Logger, registryUrl?: string);
  loadLocalGenerator(generator: string): Promise<FsMaterial>;
  loadRemoteGenerator(generator: string): Promise<FsMaterial>;
}