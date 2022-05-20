import '../../ICliConfig';
import { IFormNodeOptions, QuestionHandler } from '../../ICli';
export declare type FormNodeConfig = {};
declare module '../../ICliConfig' {
  interface CustomCliConfig {
    formNode?: FormNodeConfig;
  }
}
export interface FormNodeOptions extends IFormNodeOptions {
  formNode?: FormNodeConfig;
}
export declare const formNode: (options: FormNodeOptions) => QuestionHandler;