import '../../ICliConfig';
import { IInputNodeOptions, QuestionHandler } from '../../ICli';
export declare type NumberNodeConfig = {};
declare module '../../ICliConfig' {
  interface CustomCliConfig {
    numberNode?: NumberNodeConfig;
  }
}
export interface NumberNodeOptions extends IInputNodeOptions {
  numberNode?: NumberNodeConfig;
}
export declare const numberNode: (options: NumberNodeOptions) => QuestionHandler;