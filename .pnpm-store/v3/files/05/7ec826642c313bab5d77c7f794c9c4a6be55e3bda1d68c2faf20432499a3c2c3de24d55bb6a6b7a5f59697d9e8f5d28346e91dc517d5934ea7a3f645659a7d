import { Schema, NodeInfo } from '@modern-js/easy-form-core';
import Choice from 'inquirer/lib/objects/choice';
import Separator from 'inquirer/lib/objects/separator';
import PromptUI from 'inquirer/lib/ui/prompt';
import * as Rx from 'rxjs';
import { Inquirer } from 'inquirer';
export declare type ChoiceType = Separator | Choice;
export declare type Question = {
  type: string;
  name: string;
  message?: string | ((data: Record<string, unknown>) => string);
  default?: any | ((data: Record<string, unknown>) => any);
  choices?: (data: Record<string, unknown>) => any[];
  validate?: (value: any, data: Record<string, unknown>) => boolean | string | Promise<boolean | string>;
  filter?: (input: any) => any;
  when?: (data: Record<string, unknown>) => boolean;
  transformer?: (...args: any[]) => any;
  pageSize?: number;
  prefix?: string;
  suffix?: string;
  askAnswered?: boolean;
  loop?: boolean;
};
export declare type QuestionHandler = (answers: Record<string, unknown>) => Promise<boolean>;
export declare type IBaseNodeOptions = {
  prompts: Rx.Subject<any>;
  inquirer: Inquirer;
  promptModule: Promise<unknown> & {
    ui: PromptUI;
  };
};
export declare type IBaseNodeParams = {
  schema: Schema;
  nodeInfo: NodeInfo;
};
export declare type IRootNodeOptions = RootNodeParams & IBaseNodeOptions;
export declare type RootNodeParams = {
  childQuestionHandler?: QuestionHandler;
} & IBaseNodeParams;
export declare type RootNodeHandler = (data: RootNodeParams) => QuestionHandler;
export declare type IFormNodeOptions = FormNodeParams & IBaseNodeOptions;
export declare type FormNodeParams = {
  childQuestionHandler?: QuestionHandler[];
} & IBaseNodeParams;
export declare type FormNodeHandler = (data: FormNodeParams) => QuestionHandler;
export declare type IChildNodeOptions = ChildNodeParams & IBaseNodeOptions;
export declare type ChildNodeParams = {
  childQuestionHandler: QuestionHandler | QuestionHandler[];
} & IBaseNodeParams;
export declare type ChildNodeHandler = (data: ChildNodeParams) => QuestionHandler;
export declare type IInputNodeOptions = InputNodeParams & IBaseNodeOptions;
export declare type InputNodeParams = {
  defaultValue?: string;
} & IBaseNodeParams;
export declare type InputNodeHandler = (data: InputNodeParams) => QuestionHandler;
export declare type IListNodeOptions = ListNodeParams & IBaseNodeOptions;
export declare type ListNodeParams = {
  childNodes: (answers: Record<string, unknown>) => QuestionHandler[];
} & IBaseNodeParams;
export declare type ListNodeHandlder = (data: ListNodeParams) => QuestionHandler;
export declare type ICheckboxNodeOptions = CheckboxNodeParams & IBaseNodeOptions;
export declare type CheckboxNodeParams = {
  childNodes: (answers: Record<string, unknown>) => QuestionHandler[];
} & IBaseNodeParams;
export declare type CheckboxNodeHanlder = (data: CheckboxNodeParams) => QuestionHandler;
export declare type INoneNodeOptions = NoneNodeParams & IBaseNodeOptions;
export declare type NoneNodeParams = IBaseNodeParams;
export declare type NoneNodeHandler = (data: NoneNodeParams) => QuestionHandler;