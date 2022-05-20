import { Inquirer } from 'inquirer';
import {
  ChoiceType,
  getDefaultValue,
  getMessage,
  getNodeInfo,
  IListNodeOptions,
  Question,
  Schema,
  toPromiseQuestionHandler,
  toPromiseQuestionHandlerLoop,
} from '@modern-js/easy-form-cli';
import { List } from '@modern-js/inquirer-types';

import { CLI_TYPE } from './constant';

const registerListPrompt = (inquirer: Inquirer) => {
  try {
    inquirer.registerPrompt(CLI_TYPE.LISTNODE, List);
  } catch (error) {}
};

export const listNode = (options: IListNodeOptions) => {
  const { schema, nodeInfo, prompts, inquirer, promptModule, childNodes } =
    options;
  registerListPrompt(inquirer);
  return async (answers: Record<string, unknown>) => {
    const listHandler = toPromiseQuestionHandler({
      schema,
      nodeInfo,
      prompts,
      inquirer,
      promptModule,
      type: CLI_TYPE.LISTNODE,
      customQuestionHandler: (customOptions: {
        question: Question;
        ask: (question: Question) => Promise<boolean>;
      }) => {
        const { ask, question } = customOptions;
        if (question.choices && question.choices(answers).length === 0) {
          console.warn('No operation available');
          return Promise.resolve(true);
        } else {
          return ask(question);
        }
      },
      customChoice: (customOptions: {
        schema: Schema;
        answers: Record<string, unknown>;
        answer: Record<string, unknown>;
      }) => {
        const result: ChoiceType[] = [];
        const { answer, schema: customSchema } = customOptions;
        const customNodeInfo = getNodeInfo(
          customSchema,
          answers,
          nodeInfo.extra,
        );
        const showChoice =
          !customSchema.when || customSchema.when(answers, nodeInfo.extra);
        if (showChoice) {
          result.push({
            name: getMessage(customSchema, answers)(answer),
            value: getDefaultValue(customNodeInfo, answers) || customSchema.key,
            short: customSchema.state?.short || '',
            disabled: Boolean(customNodeInfo.disabled),
            key: customSchema.state?.key,
            checked: customSchema.state?.checked,
          });
          if (customNodeInfo.state?.extra) {
            result.push(new inquirer.Separator(customNodeInfo.state.extra));
          }
        }
        return result;
      },
    });
    const result = await listHandler(answers);
    if (result) {
      const childNodeHandler = toPromiseQuestionHandlerLoop(
        childNodes(answers),
      );
      const childResult = await childNodeHandler(answers);
      return childResult;
    }
    return true;
  };
};
