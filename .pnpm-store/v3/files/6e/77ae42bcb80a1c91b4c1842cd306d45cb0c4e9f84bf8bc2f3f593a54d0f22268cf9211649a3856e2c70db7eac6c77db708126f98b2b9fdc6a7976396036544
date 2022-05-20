import '../../ICliConfig';
import { IFormNodeOptions, QuestionHandler } from '../../ICli';
import { toPromiseQuestionHandlerLoop } from '../utils';

export type FormNodeConfig = {
  /** empty */
};

declare module '../../ICliConfig' {
  export interface CustomCliConfig {
    formNode?: FormNodeConfig;
  }
}

export interface FormNodeOptions extends IFormNodeOptions {
  formNode?: FormNodeConfig;
}

export const formNode = (options: FormNodeOptions): QuestionHandler => {
  const { childQuestionHandler = [] } = options;
  return toPromiseQuestionHandlerLoop(childQuestionHandler);
};
