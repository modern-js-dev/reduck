"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listNode = void 0;

var _easyFormCli = require("@modern-js/easy-form-cli");

var _inquirerTypes = require("@modern-js/inquirer-types");

var _constant = require("./constant");

const registerListPrompt = inquirer => {
  try {
    inquirer.registerPrompt(_constant.CLI_TYPE.LISTNODE, _inquirerTypes.List);
  } catch (error) {}
};

const listNode = options => {
  const {
    schema,
    nodeInfo,
    prompts,
    inquirer,
    promptModule,
    childNodes
  } = options;
  registerListPrompt(inquirer);
  return async answers => {
    const listHandler = (0, _easyFormCli.toPromiseQuestionHandler)({
      schema,
      nodeInfo,
      prompts,
      inquirer,
      promptModule,
      type: _constant.CLI_TYPE.LISTNODE,
      customQuestionHandler: customOptions => {
        const {
          ask,
          question
        } = customOptions;

        if (question.choices && question.choices(answers).length === 0) {
          console.warn('No operation available');
          return Promise.resolve(true);
        } else {
          return ask(question);
        }
      },
      customChoice: customOptions => {
        const result = [];
        const {
          answer,
          schema: customSchema
        } = customOptions;
        const customNodeInfo = (0, _easyFormCli.getNodeInfo)(customSchema, answers, nodeInfo.extra);
        const showChoice = !customSchema.when || customSchema.when(answers, nodeInfo.extra);

        if (showChoice) {
          var _customSchema$state, _customSchema$state2, _customSchema$state3, _customNodeInfo$state;

          result.push({
            name: (0, _easyFormCli.getMessage)(customSchema, answers)(answer),
            value: (0, _easyFormCli.getDefaultValue)(customNodeInfo, answers) || customSchema.key,
            short: ((_customSchema$state = customSchema.state) === null || _customSchema$state === void 0 ? void 0 : _customSchema$state.short) || '',
            disabled: Boolean(customNodeInfo.disabled),
            key: (_customSchema$state2 = customSchema.state) === null || _customSchema$state2 === void 0 ? void 0 : _customSchema$state2.key,
            checked: (_customSchema$state3 = customSchema.state) === null || _customSchema$state3 === void 0 ? void 0 : _customSchema$state3.checked
          });

          if ((_customNodeInfo$state = customNodeInfo.state) !== null && _customNodeInfo$state !== void 0 && _customNodeInfo$state.extra) {
            result.push(new inquirer.Separator(customNodeInfo.state.extra));
          }
        }

        return result;
      }
    });
    const result = await listHandler(answers);

    if (result) {
      const childNodeHandler = (0, _easyFormCli.toPromiseQuestionHandlerLoop)(childNodes(answers));
      const childResult = await childNodeHandler(answers);
      return childResult;
    }

    return true;
  };
};

exports.listNode = listNode;