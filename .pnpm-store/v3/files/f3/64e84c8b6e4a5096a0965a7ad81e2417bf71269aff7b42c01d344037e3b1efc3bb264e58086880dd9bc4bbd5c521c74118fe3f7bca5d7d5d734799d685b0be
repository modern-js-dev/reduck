import '../../ICliConfig';
import { IChildNodeOptions, QuestionHandler } from '../../ICli';
import { toPromiseQuestionHandlerLoop } from '../utils';

export type ChildNodeConfig = {
  /** empty */
};

declare module '../../ICliConfig' {
  export interface CustomCliConfig {
    childNode?: ChildNodeConfig;
  }
}

export interface ChildNodeOptions extends IChildNodeOptions {
  childNode?: ChildNodeConfig;
}

export const childNode = (options: ChildNodeOptions): QuestionHandler => {
  const { childQuestionHandler } = options;

  // Non-root node is an array
  if (Array.isArray(childQuestionHandler)) {
    return toPromiseQuestionHandlerLoop(childQuestionHandler);
  }

  // Sub-form of the root node
  return async (answers: any) => {
    // The root node itself is not a problem, so directly execute the child element problem
    if (childQuestionHandler) {
      await childQuestionHandler(answers);
    }
    return true;
  };
};
