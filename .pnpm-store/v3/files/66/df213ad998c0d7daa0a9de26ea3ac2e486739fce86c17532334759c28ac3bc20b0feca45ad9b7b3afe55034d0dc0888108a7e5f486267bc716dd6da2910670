"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseCliReader = void 0;

var _easyFormCore = require("@modern-js/easy-form-core");

var _constant = require("./constant");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class BaseCliReader {
  // exera params
  constructor(_options) {
    this.customCliConfigs = void 0;
    this.cliHandler = {};
    this.schemaBaseReader = void 0;
    this.schema = void 0;
    this.extra = void 0;
    this.answers = void 0;

    this.getCustomCliConfig = key => {
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

    this.analyRootNode = ({
      result,
      schema
    }) => this.cliHandler[_constant.CliNodeHandlers.ANALY_ROOT]({
      childQuestionHandler: result,
      schema,
      nodeInfo: (0, _easyFormCore.getNodeInfo)(schema, this.answers, this.extra)
    });

    this.analyFormNode = ({
      result,
      schema
    }) => this.cliHandler[_constant.CliNodeHandlers.ANALY_FORM]({
      schema,
      childQuestionHandler: result,
      nodeInfo: (0, _easyFormCore.getNodeInfo)(schema, this.answers, this.extra)
    });

    this.analyChildNode = ({
      result,
      schema
    }) => this.cliHandler[_constant.CliNodeHandlers.ANALY_CHILD]({
      schema,
      childQuestionHandler: result,
      nodeInfo: (0, _easyFormCore.getNodeInfo)(schema, this.answers, this.extra)
    });

    this.analyNoneNode = schema => this.cliHandler[_constant.CliNodeHandlers.ANALY_NONE_ITEM]({
      nodeInfo: (0, _easyFormCore.getNodeInfo)(schema, this.answers, this.extra)
    });

    this.analyValueNode = schema => this.cliHandler[_constant.CliNodeHandlers.ANALY_INPUT]({
      schema,
      nodeInfo: (0, _easyFormCore.getNodeInfo)(schema, this.answers, this.extra)
    });

    this.getChildNodes = (options, answers) => {
      const {
        parent,
        doRead
      } = options;
      const childNodes = [];
      (0, _easyFormCore.getItems)(parent, answers, this.extra).forEach(each => {
        if (each.items) {
          const isDefault = (0, _easyFormCore.getSchemaDefaultState)(each).default;

          const isChoosed = () => {
            const keyValue = (0, _easyFormCore.toBoolean)(each.key);

            if (keyValue === true) {
              return Boolean(answers[parent.key]) === keyValue;
            }

            if (Array.isArray(answers[parent.key])) {
              return answers[parent.key].includes(keyValue);
            }

            return answers[parent.key] === keyValue;
          };

          if (isChoosed() || !answers[parent.key] && isDefault) {
            childNodes.push(doRead(each));
          }
        }
      });
      return childNodes;
    };

    this.analyListNode = options => {
      const {
        parent
      } = options;

      if (!parent.items) {
        return [];
      }

      return this.cliHandler[_constant.CliNodeHandlers.ANALY_LIST]({
        schema: parent,
        childNodes: answers => this.getChildNodes(options, answers),
        nodeInfo: (0, _easyFormCore.getNodeInfo)(parent, this.answers, this.extra)
      });
    };

    this.analyCheckboxNode = options => {
      const {
        parent
      } = options;

      if (!parent.items) {
        return [];
      }

      return this.cliHandler[_constant.CliNodeHandlers.ANALY_CHECKBOX]({
        schema: parent,
        childNodes: answers => this.getChildNodes(options, answers),
        nodeInfo: (0, _easyFormCore.getNodeInfo)(parent, this.answers, this.extra)
      });
    };

    this.hasValue = key => this.answers.hasOwnProperty(key);

    this.answers = {};
    this.extra = _options.extra || {};
    this.schema = _options.schema;
    this.schemaBaseReader = new _easyFormCore.BaseReader(_options.schema, this.answers, _options.extra); // this.onChange = options.onChange;

    this.customCliConfigs = _options.customCliConfigs;
  }

  registerHandlers(handlers) {
    this.cliHandler = handlers;
  }

  getAnswers() {
    return this.answers;
  }

  setAnswers(answers) {
    this.answers = _objectSpread(_objectSpread({}, this.answers), answers);
  }

  updateAnswer(answer) {
    const keys = Object.keys(answer);
    keys.forEach(x => {
      this.answers[x] = answer[x];
    });
  }

  handleChange(value) {
    this.answers = _objectSpread(_objectSpread({}, this.answers), value); // if (this.onChange) {
    //   this.onChange(value, this.answers);
    // }
  }

  askQuestionHandler() {
    if (!this.schema) {
      return [];
    }

    this.schemaBaseReader.registReadRoot(this.analyRootNode.bind(this)).registReadForm(this.analyFormNode.bind(this)).registReadChild(this.analyChildNode.bind(this)).registReadAsValue(this.analyValueNode.bind(this)).registReadCoexitRelation(this.analyCheckboxNode.bind(this)).registerReadNoneItem(this.analyNoneNode.bind(this)).registReadMutualexclusionRelation(this.analyListNode.bind(this));
    return this.schemaBaseReader.read();
  }

}

exports.BaseCliReader = BaseCliReader;