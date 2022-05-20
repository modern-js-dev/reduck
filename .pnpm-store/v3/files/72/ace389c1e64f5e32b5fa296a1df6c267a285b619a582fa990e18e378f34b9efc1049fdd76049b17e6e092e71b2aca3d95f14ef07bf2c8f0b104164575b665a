import '../../ICliConfig';
import { IRootNodeOptions, QuestionHandler } from '../../ICli';
export declare type RootNodeConfig = {};
declare module '../../ICliConfig' {
  interface CustomCliConfig {
    rootNode?: RootNodeConfig;
  }
}
export interface RootNodeOptions extends IRootNodeOptions {
  rootNode?: RootNodeConfig;
}
export declare const rootNode: (options: RootNodeOptions) => QuestionHandler;