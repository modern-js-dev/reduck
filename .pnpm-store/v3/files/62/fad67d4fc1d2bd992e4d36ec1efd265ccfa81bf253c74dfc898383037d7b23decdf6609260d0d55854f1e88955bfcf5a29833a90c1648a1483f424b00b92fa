import { BaseReader, Handler, Schema } from '@modern-js/easy-form-core';
import { CheckboxNodeHanlder, ChildNodeHandler, ListNodeHandlder, FormNodeHandler, InputNodeHandler, NoneNodeHandler, RootNodeHandler, QuestionHandler } from './ICli';
import { CliNodeHandlers } from './constant';
import { CustomCliConfigs } from '.';
export declare type CliOptions = {
  schema: Schema;
  extra?: Record<string, unknown>;
  customCliConfigs?: CustomCliConfigs | ((data: Record<string, unknown>) => CustomCliConfigs);
};
export declare class BaseCliReader {
  readonly customCliConfigs: CustomCliConfigs | ((data: Record<string, unknown>) => CustomCliConfigs) | undefined;
  cliHandler: {
    [key: string]: Handler;
  };
  protected readonly schemaBaseReader: BaseReader;
  private readonly schema;
  private readonly extra;
  private answers;
  constructor(options: CliOptions);
  getCustomCliConfig: (key: string) => import("./ICliConfig").CustomCliConfig | null;
  registerHandlers(handlers: {
    [CliNodeHandlers.ANALY_ROOT]: RootNodeHandler;
    [CliNodeHandlers.ANALY_FORM]: FormNodeHandler;
    [CliNodeHandlers.ANALY_CHILD]: ChildNodeHandler;
    [CliNodeHandlers.ANALY_INPUT]: InputNodeHandler;
    [CliNodeHandlers.ANALY_LIST]: ListNodeHandlder;
    [CliNodeHandlers.ANALY_CHECKBOX]: CheckboxNodeHanlder;
    [CliNodeHandlers.ANALY_NONE_ITEM]: NoneNodeHandler;
  }): void;
  analyRootNode: ({
    result,
    schema
  }: {
    result: any;
    schema: Schema;
  }) => any;
  analyFormNode: ({
    result,
    schema
  }: {
    result: any;
    schema: Schema;
  }) => any;
  analyChildNode: ({
    result,
    schema
  }: {
    result: any;
    schema: Schema;
  }) => any;
  analyNoneNode: (schema: Schema) => any;
  analyValueNode: (schema: Schema) => any;
  private readonly getChildNodes;
  analyListNode: (options: {
    parent: Schema;
    doRead: (schema: Schema) => QuestionHandler;
  }) => any;
  analyCheckboxNode: (options: {
    parent: Schema;
    doRead: (schema: Schema) => QuestionHandler;
  }) => any;
  getAnswers(): Record<string, unknown>;
  setAnswers(answers: Record<string, unknown>): void;
  updateAnswer(answer: Record<string, unknown>): void;
  handleChange(value: any): void;
  private readonly hasValue;
  askQuestionHandler(): QuestionHandler[];
}