import { getDefaultValue, getMessage, getNodeInfo, toPromiseQuestionHandler, toPromiseQuestionHandlerLoop } from '@modern-js/easy-form-cli';
import { List } from '@modern-js/inquirer-types';
import { CLI_TYPE } from "./constant";

const registerListPrompt = inquirer => {
  try {
    inquirer.registerPrompt(CLI_TYPE.LISTNODE, List);
  } catch (error) {}
};

export const listNode = options => {
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
    const listHandler = toPromiseQuestionHandler({
      schema,
      nodeInfo,
      prompts,
      inquirer,
      promptModule,
      type: CLI_TYPE.LISTNODE,
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
        const customNodeInfo = getNodeInfo(customSchema, answers, nodeInfo.extra);
        const showChoice = !customSchema.when || customSchema.when(answers, nodeInfo.extra);

        if (showChoice) {
          var _customSchema$state, _customSchema$state2, _customSchema$state3, _customNodeInfo$state;

          result.push({
            name: getMessage(customSchema, answers)(answer),
            value: getDefaultValue(customNodeInfo, answers) || customSchema.key,
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
      const childNodeHandler = toPromiseQuestionHandlerLoop(childNodes(answers));
      const childResult = await childNodeHandler(answers);
      return childResult;
    }

    return true;
  };
};