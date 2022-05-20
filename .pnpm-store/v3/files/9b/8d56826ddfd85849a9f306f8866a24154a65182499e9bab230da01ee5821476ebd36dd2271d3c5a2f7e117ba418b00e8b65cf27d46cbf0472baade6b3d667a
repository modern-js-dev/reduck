import { BaseCliReader, CliOptions } from '../baseCliReader';
import { CheckboxNodeParams, ChildNodeParams, FormNodeParams, InputNodeParams, ListNodeParams, NoneNodeParams, RootNodeParams } from '../ICli';
import { CustomCliConfig, CustomCliConfigs } from '../ICliConfig';
export type { CustomCliConfig, CustomCliConfigs };
export declare const CLI_TYPE: Record<string, string>;
export declare const setCliQuestionsHandlers: (questions: Record<string, unknown>) => void;
export declare class CliReader extends BaseCliReader {
  static customQuestions: any;
  private readonly prompts;
  private readonly promptModule;
  private readonly inquirer;
  constructor(options: CliOptions);
  startQuestion(options: {
    onEachAnswer?: (...args: any[]) => any;
    onError?: (...args: any[]) => any;
    onComplete?: (...args: any[]) => any;
  }): void;
  private getCliQuestionHandler;
  private readonly getBaseOptions;
  rootNodeHandler: (data: RootNodeParams) => any;
  formNodeHandler: (data: FormNodeParams) => any;
  childNodeHandler: (data: ChildNodeParams) => any;
  inputNodeHandler: (data: InputNodeParams) => any;
  listNodeHandler: (data: ListNodeParams) => any;
  checkboxNodeHandler: (data: CheckboxNodeParams) => any;
  noneNodeHandler: (data: NoneNodeParams) => any;
  private getCliDefaultType;
}
export * from './utils';