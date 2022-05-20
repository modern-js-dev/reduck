import '../../ICliConfig';
import { ICheckboxNodeOptions, QuestionHandler } from '../../ICli';
import {
  toPromiseQuestionHandler,
  toPromiseQuestionHandlerLoop,
} from '../utils';

export type CheckboxNodeConfig = {
  /** empty */
};

declare module '../../ICliConfig' {
  export interface CustomCliConfig {
    checkboxNode?: CheckboxNodeConfig;
  }
}

export interface CheckboxOptions extends ICheckboxNodeOptions {
  checkboxNode?: CheckboxNodeConfig;
}

export const checkboxNode = (options: CheckboxOptions): QuestionHandler => {
  const { schema, nodeInfo, prompts, inquirer, promptModule, childNodes } =
    options;

  return async (answers: Record<string, unknown>) => {
    const listHandler = toPromiseQuestionHandler({
      schema,
      nodeInfo,
      prompts,
      inquirer,
      promptModule,
      type: 'checkbox',
    });
    const result = await listHandler(answers);
    if (result) {
      const childNodeHandler = toPromiseQuestionHandlerLoop(
        childNodes(answers),
      );
      const childResult = await childNodeHandler(answers);
      return childResult;
    }
    return false;
  };
};
