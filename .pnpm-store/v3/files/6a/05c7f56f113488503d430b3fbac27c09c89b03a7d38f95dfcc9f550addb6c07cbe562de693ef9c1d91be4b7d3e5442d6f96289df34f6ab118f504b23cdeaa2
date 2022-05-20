import '../../ICliConfig';
import { IListNodeOptions, QuestionHandler } from '../../ICli';
export declare type ListNodeConfig = {};
declare module '../../ICliConfig' {
  interface CustomCliConfig {
    listNode?: ListNodeConfig;
  }
}
export interface ListNodeOptions extends IListNodeOptions {
  listNode?: ListNodeConfig;
}
export declare const listNode: (options: ListNodeOptions) => QuestionHandler;