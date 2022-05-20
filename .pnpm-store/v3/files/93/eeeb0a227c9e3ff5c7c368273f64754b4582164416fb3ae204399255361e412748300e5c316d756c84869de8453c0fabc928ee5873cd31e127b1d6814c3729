import { Schema, NodeInfo } from '@modern-js/easy-form-core';
import Choice from 'inquirer/lib/objects/choice';
import Separator from 'inquirer/lib/objects/separator';
import PromptUI from 'inquirer/lib/ui/prompt';
import * as Rx from 'rxjs';
import { Inquirer } from 'inquirer';

export type ChoiceType = Separator | Choice;

export type Question = {
  type: string;
  name: string;
  message?: string | ((data: Record<string, unknown>) => string);
  default?: any | ((data: Record<string, unknown>) => any);
  choices?: (data: Record<string, unknown>) => any[];
  validate?: (
    value: any,
    data: Record<string, unknown>,
  ) => boolean | string | Promise<boolean | string>;
  filter?: (input: any) => any;
  when?: (data: Record<string, unknown>) => boolean;
  transformer?: (...args: any[]) => any;
  pageSize?: number;
  prefix?: string;
  suffix?: string;
  askAnswered?: boolean;
  loop?: boolean;
};

// answers are all answers in the current question list.
// The returned result indicates whether the processing is complete
export type QuestionHandler = (
  answers: Record<string, unknown>,
) => Promise<boolean>;

// Node basic configuration properties
export type IBaseNodeOptions = {
  prompts: Rx.Subject<any>;
  inquirer: Inquirer;
  promptModule: Promise<unknown> & {
    ui: PromptUI;
  };
};

// Node basic parameters
export type IBaseNodeParams = {
  schema: Schema;
  nodeInfo: NodeInfo;
};

export type IRootNodeOptions = RootNodeParams & IBaseNodeOptions;
export type RootNodeParams = {
  childQuestionHandler?: QuestionHandler;
} & IBaseNodeParams;

export type RootNodeHandler = (data: RootNodeParams) => QuestionHandler;

export type IFormNodeOptions = FormNodeParams & IBaseNodeOptions;
export type FormNodeParams = {
  childQuestionHandler?: QuestionHandler[];
} & IBaseNodeParams;

export type FormNodeHandler = (data: FormNodeParams) => QuestionHandler;

export type IChildNodeOptions = ChildNodeParams & IBaseNodeOptions;
export type ChildNodeParams = {
  childQuestionHandler: QuestionHandler | QuestionHandler[];
} & IBaseNodeParams;

export type ChildNodeHandler = (data: ChildNodeParams) => QuestionHandler;

export type IInputNodeOptions = InputNodeParams & IBaseNodeOptions;
export type InputNodeParams = {
  defaultValue?: string;
} & IBaseNodeParams;

export type InputNodeHandler = (data: InputNodeParams) => QuestionHandler;

// choices
export type IListNodeOptions = ListNodeParams & IBaseNodeOptions;
export type ListNodeParams = {
  childNodes: (answers: Record<string, unknown>) => QuestionHandler[];
} & IBaseNodeParams;

export type ListNodeHandlder = (data: ListNodeParams) => QuestionHandler;

export type ICheckboxNodeOptions = CheckboxNodeParams & IBaseNodeOptions;
export type CheckboxNodeParams = {
  childNodes: (answers: Record<string, unknown>) => QuestionHandler[];
} & IBaseNodeParams;

export type CheckboxNodeHanlder = (data: CheckboxNodeParams) => QuestionHandler;

export type INoneNodeOptions = NoneNodeParams & IBaseNodeOptions;
export type NoneNodeParams = IBaseNodeParams;
export type NoneNodeHandler = (data: NoneNodeParams) => QuestionHandler;
