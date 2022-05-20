import {
  BaseReader,
  getItems,
  toBoolean,
  Handler,
  Schema,
  getSchemaDefaultState,
  getNodeInfo,
} from '@modern-js/easy-form-core';
import {
  CheckboxNodeHanlder,
  ChildNodeHandler,
  ListNodeHandlder,
  FormNodeHandler,
  InputNodeHandler,
  NoneNodeHandler,
  RootNodeHandler,
  QuestionHandler,
} from './ICli';

import { CliNodeHandlers } from './constant';
import { CustomCliConfigs } from '.';

export type CliOptions = {
  schema: Schema;
  // onChange?: (...args: any[]) => any;
  extra?: Record<string, unknown>;
  customCliConfigs?:
    | CustomCliConfigs
    | ((data: Record<string, unknown>) => CustomCliConfigs);
};
export class BaseCliReader {
  public readonly customCliConfigs:
    | CustomCliConfigs
    | ((data: Record<string, unknown>) => CustomCliConfigs)
    | undefined;

  public cliHandler: { [key: string]: Handler } = {};

  protected readonly schemaBaseReader: BaseReader;

  private readonly schema: Schema;

  // exera params
  private readonly extra: Record<string, unknown>;

  private answers: Record<string, unknown>;

  constructor(options: CliOptions) {
    this.answers = {};
    this.extra = options.extra || {};
    this.schema = options.schema;
    this.schemaBaseReader = new BaseReader(
      options.schema,
      this.answers,
      options.extra,
    );
    // this.onChange = options.onChange;
    this.customCliConfigs = options.customCliConfigs;
  }

  public getCustomCliConfig = (key: string) => {
    if (!this.customCliConfigs) {
      return null;
    }
    if (typeof this.customCliConfigs === 'function') {
      const config = this.customCliConfigs(this.answers);

      if (!config) {
        return null;
      }
      return config[key];
    }
    return this.customCliConfigs[key];
  };

  registerHandlers(handlers: {
    [CliNodeHandlers.ANALY_ROOT]: RootNodeHandler;
    [CliNodeHandlers.ANALY_FORM]: FormNodeHandler;
    [CliNodeHandlers.ANALY_CHILD]: ChildNodeHandler;
    [CliNodeHandlers.ANALY_INPUT]: InputNodeHandler;
    [CliNodeHandlers.ANALY_LIST]: ListNodeHandlder;
    [CliNodeHandlers.ANALY_CHECKBOX]: CheckboxNodeHanlder;
    [CliNodeHandlers.ANALY_NONE_ITEM]: NoneNodeHandler;
  }) {
    this.cliHandler = handlers;
  }

  analyRootNode = ({ result, schema }: { result: any; schema: Schema }) =>
    this.cliHandler[CliNodeHandlers.ANALY_ROOT]({
      childQuestionHandler: result,
      schema,
      nodeInfo: getNodeInfo(schema, this.answers, this.extra),
    });

  analyFormNode = ({ result, schema }: { result: any; schema: Schema }) =>
    this.cliHandler[CliNodeHandlers.ANALY_FORM]({
      schema,
      childQuestionHandler: result,
      nodeInfo: getNodeInfo(schema, this.answers, this.extra),
    });

  analyChildNode = ({ result, schema }: { result: any; schema: Schema }) =>
    this.cliHandler[CliNodeHandlers.ANALY_CHILD]({
      schema,
      childQuestionHandler: result,
      nodeInfo: getNodeInfo(schema, this.answers, this.extra),
    });

  analyNoneNode = (schema: Schema) =>
    this.cliHandler[CliNodeHandlers.ANALY_NONE_ITEM]({
      nodeInfo: getNodeInfo(schema, this.answers, this.extra),
    });

  analyValueNode = (schema: Schema) =>
    this.cliHandler[CliNodeHandlers.ANALY_INPUT]({
      schema,
      nodeInfo: getNodeInfo(schema, this.answers, this.extra),
    });

  private readonly getChildNodes = (
    options: {
      parent: Schema;
      doRead: (schema: Schema) => QuestionHandler;
    },
    answers: Record<string, unknown>,
  ): QuestionHandler[] => {
    const { parent, doRead } = options;
    const childNodes: QuestionHandler[] = [];
    getItems(parent, answers, this.extra).forEach((each: Schema) => {
      if (each.items) {
        const isDefault = getSchemaDefaultState(each).default;
        const isChoosed = () => {
          const keyValue = toBoolean(each.key);
          if (keyValue === true) {
            return Boolean(answers[parent.key]) === keyValue;
          }
          if (Array.isArray(answers[parent.key])) {
            return (answers[parent.key] as (string | boolean)[]).includes(
              keyValue,
            );
          }
          return answers[parent.key] === keyValue;
        };
        if (isChoosed() || (!answers[parent.key] && isDefault)) {
          childNodes.push(doRead(each));
        }
      }
    });
    return childNodes;
  };

  analyListNode = (options: {
    parent: Schema;
    doRead: (schema: Schema) => QuestionHandler;
  }) => {
    const { parent } = options;
    if (!parent.items) {
      return [];
    }
    return this.cliHandler[CliNodeHandlers.ANALY_LIST]({
      schema: parent,
      childNodes: (answers: Record<string, unknown>) =>
        this.getChildNodes(options, answers),
      nodeInfo: getNodeInfo(parent, this.answers, this.extra),
    });
  };

  analyCheckboxNode = (options: {
    parent: Schema;
    doRead: (schema: Schema) => QuestionHandler;
  }) => {
    const { parent } = options;
    if (!parent.items) {
      return [];
    }

    return this.cliHandler[CliNodeHandlers.ANALY_CHECKBOX]({
      schema: parent,
      childNodes: (answers: Record<string, unknown>) =>
        this.getChildNodes(options, answers),
      nodeInfo: getNodeInfo(parent, this.answers, this.extra),
    });
  };

  getAnswers() {
    return this.answers;
  }

  setAnswers(answers: Record<string, unknown>) {
    this.answers = {
      ...this.answers,
      ...answers,
    };
  }

  updateAnswer(answer: Record<string, unknown>) {
    const keys = Object.keys(answer);
    keys.forEach(x => {
      this.answers[x] = answer[x];
    });
  }

  handleChange(value: any) {
    this.answers = {
      ...this.answers,
      ...value,
    };
    // if (this.onChange) {
    //   this.onChange(value, this.answers);
    // }
  }

  private readonly hasValue = (key: string) => this.answers.hasOwnProperty(key);

  public askQuestionHandler(): QuestionHandler[] {
    if (!this.schema) {
      return [];
    }
    this.schemaBaseReader
      .registReadRoot(this.analyRootNode.bind(this))
      .registReadForm(this.analyFormNode.bind(this))
      .registReadChild(this.analyChildNode.bind(this))
      .registReadAsValue(this.analyValueNode.bind(this))
      .registReadCoexitRelation(this.analyCheckboxNode.bind(this))
      .registerReadNoneItem(this.analyNoneNode.bind(this))
      .registReadMutualexclusionRelation(this.analyListNode.bind(this));
    return this.schemaBaseReader.read();
  }
}
