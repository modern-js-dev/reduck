import '../../ICliConfig';
import { IInputNodeOptions, QuestionHandler } from '../../ICli';
export declare type InputNodeConfig = {};
declare module '../../ICliConfig' {
  interface CustomCliConfig {
    inputNode?: InputNodeConfig;
  }
}
export interface InputNodeOptions extends IInputNodeOptions {
  inputNode?: InputNodeConfig;
}
export declare const inputNode: (options: InputNodeOptions) => QuestionHandler;