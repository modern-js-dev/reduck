import '../../ICliConfig';
import { IChildNodeOptions, QuestionHandler } from '../../ICli';
export declare type ChildNodeConfig = {};
declare module '../../ICliConfig' {
  interface CustomCliConfig {
    childNode?: ChildNodeConfig;
  }
}
export interface ChildNodeOptions extends IChildNodeOptions {
  childNode?: ChildNodeConfig;
}
export declare const childNode: (options: ChildNodeOptions) => QuestionHandler;