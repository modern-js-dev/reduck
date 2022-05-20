"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  CLI_TYPE: true,
  setCliQuestionsHandlers: true,
  CliReader: true
};
exports.setCliQuestionsHandlers = exports.CliReader = exports.CLI_TYPE = void 0;

var _inquirer = _interopRequireDefault(require("inquirer"));

var Rx = _interopRequireWildcard(require("rxjs"));

var _baseCliReader = require("../baseCliReader");

var _constant = require("../constant");

var questionsHandlers = _interopRequireWildcard(require("./handlers"));

var _utils = require("./utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _utils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _utils[key];
    }
  });
});

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// cli default question type
const CLI_TYPE = {
  CHECKBOXNODE: 'checkboxNode',
  ROOTNODE: 'rootNode',
  CHILDNODE: 'childNode',
  INPUTNODE: 'inputNode',
  NUMBERNODE: 'numberNode',
  LISTNODE: 'listNode',
  FORMNODE: 'formNode'
};
exports.CLI_TYPE = CLI_TYPE;

const setCliQuestionsHandlers = questions => {
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

exports.setCliQuestionsHandlers = setCliQuestionsHandlers;

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

class CliReader extends _baseCliReader.BaseCliReader {
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
      [_constant.CliNodeHandlers.ANALY_ROOT]: this.rootNodeHandler.bind(this),
      [_constant.CliNodeHandlers.ANALY_FORM]: this.formNodeHandler.bind(this),
      [_constant.CliNodeHandlers.ANALY_CHILD]: this.childNodeHandler.bind(this),
      [_constant.CliNodeHandlers.ANALY_INPUT]: this.inputNodeHandler.bind(this),
      [_constant.CliNodeHandlers.ANALY_LIST]: this.listNodeHandler.bind(this),
      [_constant.CliNodeHandlers.ANALY_CHECKBOX]: this.checkboxNodeHandler.bind(this),
      [_constant.CliNodeHandlers.ANALY_NONE_ITEM]: this.noneNodeHandler.bind(this)
    });
    this.prompts = new Rx.Subject();
    this.inquirer = _inquirer.default;
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

exports.CliReader = CliReader;
CliReader.customQuestions = void 0;
setCliQuestionsHandlers(questionsHandlers);