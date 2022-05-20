import { Schema } from '@modern-js/easy-form-core';
import inquirer, { Answers, Inquirer } from 'inquirer';
import PromptUI from 'inquirer/lib/ui/prompt';
import * as Rx from 'rxjs';
import { BaseCliReader, CliOptions } from '../baseCliReader';
import { CliNodeHandlers } from '../constant';
import {
  CheckboxNodeParams,
  ChildNodeParams,
  FormNodeParams,
  InputNodeParams,
  ListNodeParams,
  NoneNodeParams,
  RootNodeParams,
} from '../ICli';

import { CustomCliConfig, CustomCliConfigs } from '../ICliConfig';
import * as questionsHandlers from './handlers';

export type { CustomCliConfig, CustomCliConfigs };

// cli default question type
export const CLI_TYPE: Record<string, string> = {
  CHECKBOXNODE: 'checkboxNode',
  ROOTNODE: 'rootNode',
  CHILDNODE: 'childNode',
  INPUTNODE: 'inputNode',
  NUMBERNODE: 'numberNode',
  LISTNODE: 'listNode',
  FORMNODE: 'formNode',
};

export const setCliQuestionsHandlers = (questions: Record<string, unknown>) => {
  if (!CliReader.customQuestions) {
    CliReader.customQuestions = {};
  }
  CliReader.customQuestions = {
    ...CliReader.customQuestions,
    ...questions,
  };
  const questionNames = Object.keys(questions);
  questionNames.forEach(x => {
    CLI_TYPE[x.toUpperCase()] = x;
  });
  validateCliQuestionsHandlers(CliReader.customQuestions);
};

const validateCliQuestionsHandlers = (
  questions: Record<string, unknown> = {},
) => {
  const coreNeed = Object.values(CLI_TYPE);
  const miss: string[] = [];
  coreNeed.forEach(x => {
    if (!questions[x]) {
      miss.push(x);
    }
  });
  if (miss.length > 0) {
    console.error(`miss these question handler: ${miss.join(',')}`);
    throw Error(`miss these question handler: ${miss.join(',')}`);
  }
};

export class CliReader extends BaseCliReader {
  static customQuestions: any;

  private readonly prompts: Rx.Subject<any>;

  private readonly promptModule: Promise<unknown> & {
    ui: PromptUI;
  };

  private readonly inquirer: Inquirer;

  constructor(options: CliOptions) {
    super(options);
    this.registerHandlers({
      [CliNodeHandlers.ANALY_ROOT]: this.rootNodeHandler.bind(this),
      [CliNodeHandlers.ANALY_FORM]: this.formNodeHandler.bind(this),
      [CliNodeHandlers.ANALY_CHILD]: this.childNodeHandler.bind(this),
      [CliNodeHandlers.ANALY_INPUT]: this.inputNodeHandler.bind(this),
      [CliNodeHandlers.ANALY_LIST]: this.listNodeHandler.bind(this),
      [CliNodeHandlers.ANALY_CHECKBOX]: this.checkboxNodeHandler.bind(this),
      [CliNodeHandlers.ANALY_NONE_ITEM]: this.noneNodeHandler.bind(this),
    });
    this.prompts = new Rx.Subject();
    this.inquirer = inquirer;
    this.promptModule = this.inquirer.prompt(this.prompts);
  }

  startQuestion(options: {
    onEachAnswer?: (...args: any[]) => any;
    onError?: (...args: any[]) => any;
    onComplete?: (...args: any[]) => any;
  }) {
    validateCliQuestionsHandlers(CliReader.customQuestions);
    const { onComplete, onEachAnswer, onError } = options;
    this.promptModule.ui.process.subscribe(
      (answer: Answers) => {
        this.updateAnswer({
          [answer.name]: answer.answer,
        });
        if (onEachAnswer) {
          onEachAnswer(answer);
        }
      },
      onError,
      () => {
        if (onComplete) {
          onComplete(this.getAnswers());
        }
      },
    );

    this.askQuestionHandler();
  }

  private getCliQuestionHandler(key: string) {
    if (!CliReader.customQuestions || !CliReader.customQuestions[key]) {
      console.error('handler not found:', key);
      throw Error(`handler not found: ${key}`);
    }
    return CliReader.customQuestions[key];
  }

  private readonly getBaseOptions = () => ({
    prompts: this.prompts,
    promptModule: this.promptModule,
    inquirer: this.inquirer,
  });

  rootNodeHandler = (data: RootNodeParams) => {
    const config = this.getCustomCliConfig(data.nodeInfo.id);
    const cliField = config?.field || CLI_TYPE.ROOTNODE;
    return this.getCliQuestionHandler(cliField)({
      ...data,
      ...this.getBaseOptions(),
    })(this.getAnswers());
  };

  formNodeHandler = (data: FormNodeParams) => {
    const config = this.getCustomCliConfig(data.nodeInfo.id);
    const cliField = config?.field || CLI_TYPE.FORMNODE;
    return this.getCliQuestionHandler(cliField)({
      ...data,
      ...this.getBaseOptions(),
    });
  };

  childNodeHandler = (data: ChildNodeParams) => {
    const config = this.getCustomCliConfig(data.nodeInfo.id);
    const cliField = config?.field || CLI_TYPE.CHILDNODE;
    return this.getCliQuestionHandler(cliField)({
      ...data,
      ...this.getBaseOptions(),
    });
  };

  inputNodeHandler = (data: InputNodeParams) => {
    const config = this.getCustomCliConfig(data.nodeInfo.id);
    const cliField = config?.field || this.getCliDefaultType(data.schema);
    return this.getCliQuestionHandler(cliField)({
      ...data,
      ...this.getBaseOptions(),
    });
  };

  listNodeHandler = (data: ListNodeParams) => {
    const config = this.getCustomCliConfig(data.nodeInfo.id);
    const cliField = config?.field || CLI_TYPE.LISTNODE;
    return this.getCliQuestionHandler(cliField)({
      ...data,
      ...this.getBaseOptions(),
    });
  };

  checkboxNodeHandler = (data: CheckboxNodeParams) => {
    const config = this.getCustomCliConfig(data.nodeInfo.id);
    const cliField = config?.field || CLI_TYPE.CHECKBOXNODE;
    return this.getCliQuestionHandler(cliField)({
      ...data,
      ...this.getBaseOptions(),
    });
  };

  noneNodeHandler = (data: NoneNodeParams) => {
    const config = this.getCustomCliConfig(data.nodeInfo.id);
    if (config?.field) {
      return this.getCliQuestionHandler(config?.field)({
        ...data,
        ...this.getBaseOptions(),
      });
    }
    return () => Promise.resolve(true);
  };

  private getCliDefaultType(schema: Schema) {
    const types = this.schemaBaseReader.getSchemaType(schema);
    if (!types || types.length === 0) {
      return '';
    }
    // currently cli-side parsing only handles single types
    const type = types[0];
    let fieldType = '';
    switch (type) {
      case 'string':
        fieldType = CLI_TYPE.INPUTNODE;
        break;
      case 'number':
        fieldType = CLI_TYPE.NUMBERNODE;
        break;
      default:
        fieldType = '';
    }
    return fieldType;
  }
}
setCliQuestionsHandlers(questionsHandlers);

export * from './utils';
