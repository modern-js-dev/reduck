function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import inquirer from 'inquirer';
import * as Rx from 'rxjs';
import { BaseCliReader } from "../baseCliReader";
import { CliNodeHandlers } from "../constant";
import * as questionsHandlers from "./handlers";
// cli default question type
export const CLI_TYPE = {
  CHECKBOXNODE: 'checkboxNode',
  ROOTNODE: 'rootNode',
  CHILDNODE: 'childNode',
  INPUTNODE: 'inputNode',
  NUMBERNODE: 'numberNode',
  LISTNODE: 'listNode',
  FORMNODE: 'formNode'
};
export const setCliQuestionsHandlers = questions => {
  if (!CliReader.customQuestions) {
    CliReader.customQuestions = {};
  }

  CliReader.customQuestions = _objectSpread(_objectSpread({}, CliReader.customQuestions), questions);
  const questionNames = Object.keys(questions);
  questionNames.forEach(x => {
    CLI_TYPE[x.toUpperCase()] = x;
  });
  validateCliQuestionsHandlers(CliReader.customQuestions);
};

const validateCliQuestionsHandlers = (questions = {}) => {
  const coreNeed = Object.values(CLI_TYPE);
  const miss = [];
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
  constructor(options) {
    super(options);
    this.prompts = void 0;
    this.promptModule = void 0;
    this.inquirer = void 0;

    this.getBaseOptions = () => ({
      prompts: this.prompts,
      promptModule: this.promptModule,
      inquirer: this.inquirer
    });

    this.rootNodeHandler = data => {
      const config = this.getCustomCliConfig(data.nodeInfo.id);
      const cliField = (config === null || config === void 0 ? void 0 : config.field) || CLI_TYPE.ROOTNODE;
      return this.getCliQuestionHandler(cliField)(_objectSpread(_objectSpread({}, data), this.getBaseOptions()))(this.getAnswers());
    };

    this.formNodeHandler = data => {
      const config = this.getCustomCliConfig(data.nodeInfo.id);
      const cliField = (config === null || config === void 0 ? void 0 : config.field) || CLI_TYPE.FORMNODE;
      return this.getCliQuestionHandler(cliField)(_objectSpread(_objectSpread({}, data), this.getBaseOptions()));
    };

    this.childNodeHandler = data => {
      const config = this.getCustomCliConfig(data.nodeInfo.id);
      const cliField = (config === null || config === void 0 ? void 0 : config.field) || CLI_TYPE.CHILDNODE;
      return this.getCliQuestionHandler(cliField)(_objectSpread(_objectSpread({}, data), this.getBaseOptions()));
    };

    this.inputNodeHandler = data => {
      const config = this.getCustomCliConfig(data.nodeInfo.id);
      const cliField = (config === null || config === void 0 ? void 0 : config.field) || this.getCliDefaultType(data.schema);
      return this.getCliQuestionHandler(cliField)(_objectSpread(_objectSpread({}, data), this.getBaseOptions()));
    };

    this.listNodeHandler = data => {
      const config = this.getCustomCliConfig(data.nodeInfo.id);
      const cliField = (config === null || config === void 0 ? void 0 : config.field) || CLI_TYPE.LISTNODE;
      return this.getCliQuestionHandler(cliField)(_objectSpread(_objectSpread({}, data), this.getBaseOptions()));
    };

    this.checkboxNodeHandler = data => {
      const config = this.getCustomCliConfig(data.nodeInfo.id);
      const cliField = (config === null || config === void 0 ? void 0 : config.field) || CLI_TYPE.CHECKBOXNODE;
      return this.getCliQuestionHandler(cliField)(_objectSpread(_objectSpread({}, data), this.getBaseOptions()));
    };

    this.noneNodeHandler = data => {
      const config = this.getCustomCliConfig(data.nodeInfo.id);

      if (config !== null && config !== void 0 && config.field) {
        return this.getCliQuestionHandler(config === null || config === void 0 ? void 0 : config.field)(_objectSpread(_objectSpread({}, data), this.getBaseOptions()));
      }

      return () => Promise.resolve(true);
    };

    this.registerHandlers({
      [CliNodeHandlers.ANALY_ROOT]: this.rootNodeHandler.bind(this),
      [CliNodeHandlers.ANALY_FORM]: this.formNodeHandler.bind(this),
      [CliNodeHandlers.ANALY_CHILD]: this.childNodeHandler.bind(this),
      [CliNodeHandlers.ANALY_INPUT]: this.inputNodeHandler.bind(this),
      [CliNodeHandlers.ANALY_LIST]: this.listNodeHandler.bind(this),
      [CliNodeHandlers.ANALY_CHECKBOX]: this.checkboxNodeHandler.bind(this),
      [CliNodeHandlers.ANALY_NONE_ITEM]: this.noneNodeHandler.bind(this)
    });
    this.prompts = new Rx.Subject();
    this.inquirer = inquirer;
    this.promptModule = this.inquirer.prompt(this.prompts);
  }

  startQuestion(options) {
    validateCliQuestionsHandlers(CliReader.customQuestions);
    const {
      onComplete,
      onEachAnswer,
      onError
    } = options;
    this.promptModule.ui.process.subscribe(answer => {
      this.updateAnswer({
        [answer.name]: answer.answer
      });

      if (onEachAnswer) {
        onEachAnswer(answer);
      }
    }, onError, () => {
      if (onComplete) {
        onComplete(this.getAnswers());
      }
    });
    this.askQuestionHandler();
  }

  getCliQuestionHandler(key) {
    if (!CliReader.customQuestions || !CliReader.customQuestions[key]) {
      console.error('handler not found:', key);
      throw Error(`handler not found: ${key}`);
    }

    return CliReader.customQuestions[key];
  }

  getCliDefaultType(schema) {
    const types = this.schemaBaseReader.getSchemaType(schema);

    if (!types || types.length === 0) {
      return '';
    } // currently cli-side parsing only handles single types


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
CliReader.customQuestions = void 0;
setCliQuestionsHandlers(questionsHandlers);
export * from "./utils";