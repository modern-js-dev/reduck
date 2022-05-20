import '../../ICliConfig';
import { ICheckboxNodeOptions, QuestionHandler } from '../../ICli';
export declare type CheckboxNodeConfig = {};
declare module '../../ICliConfig' {
  interface CustomCliConfig {
    checkboxNode?: CheckboxNodeConfig;
  }
}
export interface CheckboxOptions extends ICheckboxNodeOptions {
  checkboxNode?: CheckboxNodeConfig;
}
export declare const checkboxNode: (options: CheckboxOptions) => QuestionHandler;