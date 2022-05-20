import '../../ICliConfig';
import { IInputNodeOptions, QuestionHandler } from '../../ICli';
import { toPromiseQuestionHandler } from '../utils';

export type NumberNodeConfig = {
  /** empty */
};
declare module '../../ICliConfig' {
  export interface CustomCliConfig {
    numberNode?: NumberNodeConfig;
  }
}

export interface NumberNodeOptions extends IInputNodeOptions {
  numberNode?: NumberNodeConfig;
}

export const numberNode = (options: NumberNodeOptions): QuestionHandler => {
  const { schema, nodeInfo, prompts, inquirer, promptModule } = options;

  return toPromiseQuestionHandler({
    schema,
    nodeInfo,
    type: 'number',
    inquirer,
    promptModule,
    prompts,
  });
};
