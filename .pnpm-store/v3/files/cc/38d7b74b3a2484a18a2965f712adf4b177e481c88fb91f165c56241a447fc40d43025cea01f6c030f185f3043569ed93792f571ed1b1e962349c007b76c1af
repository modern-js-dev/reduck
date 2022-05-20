import '../../ICliConfig';
import { IListNodeOptions, QuestionHandler } from '../../ICli';
import {
  toPromiseQuestionHandler,
  toPromiseQuestionHandlerLoop,
} from '../utils';

export type ListNodeConfig = {
  /** empty */
};
declare module '../../ICliConfig' {
  export interface CustomCliConfig {
    listNode?: ListNodeConfig;
  }
}

export interface ListNodeOptions extends IListNodeOptions {
  listNode?: ListNodeConfig;
}

export const listNode = (options: ListNodeOptions): QuestionHandler => {
  const { schema, nodeInfo, prompts, inquirer, promptModule, childNodes } =
    options;

  return async (answers: Record<string, unknown>) => {
    const listHandler = toPromiseQuestionHandler({
      schema,
      nodeInfo,
      prompts,
      inquirer,
      promptModule,
      type: 'list',
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
