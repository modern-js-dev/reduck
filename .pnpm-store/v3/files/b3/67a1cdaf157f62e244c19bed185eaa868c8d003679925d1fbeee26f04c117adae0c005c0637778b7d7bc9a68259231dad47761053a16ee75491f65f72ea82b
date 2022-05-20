import { NodeInfo, Schema } from '@modern-js/easy-form-core';
import { ChoiceType, IBaseNodeOptions, Question, QuestionHandler } from '../ICli';
export declare const getMessage: (schema: Schema, answers: Record<string, unknown>, extra?: Record<string, unknown> | undefined) => (answer: any) => string;
export declare const getDefaultValue: (nodeInfo: NodeInfo, answers: Record<string, unknown>) => any;
export declare type CustomChoiceType = (options: {
  schema: Schema;
  answers: Record<string, unknown>;
  answer: Record<string, unknown>;
}) => ChoiceType[];
export declare const getChoices: (options: {
  schema: Schema;
  answers: Record<string, unknown>;
  customChoice?: CustomChoiceType;
  extra?: Record<string, unknown>;
}) => (answer: Record<string, unknown>) => ChoiceType[];
export declare const getValidate: (schema: Schema, answers: Record<string, unknown>, extra?: Record<string, unknown> | undefined) => (answer: any) => Promise<string | true>;
export declare const getFilter: (nodeInfo: NodeInfo, type: string, answers: Record<string, unknown>) => (answer: any) => any;
export declare const getTransformer: (nodeInfo: NodeInfo, answers: Record<string, unknown>) => (answer: any) => any;
export declare const getWhen: (nodeInfo: NodeInfo, answers: Record<string, unknown>) => (answer: any) => boolean;
export declare const getQuestion: (options: {
  schema: Schema;
  nodeInfo: NodeInfo;
  answers: Record<string, unknown>;
  type: string;
  customChoice?: CustomChoiceType;
}) => Question;
export declare type PromiseQuestionHandlerOptions = IBaseNodeOptions & {
  schema: Schema;
  nodeInfo: NodeInfo;
  type: string;
  customChoice?: CustomChoiceType;
  customQuestionHandler?: (options: {
    question: Question;
    ask: (question: Question) => Promise<boolean>;
  }) => Promise<boolean>;
  extra?: Record<string, unknown>;
};
export declare const toPromiseQuestionHandler: (options: PromiseQuestionHandlerOptions) => QuestionHandler;
export declare const toPromiseQuestionHandlerLoop: (questionHandlers: QuestionHandler[]) => QuestionHandler;