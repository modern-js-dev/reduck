import "../../ICliConfig";
import { toPromiseQuestionHandler } from "../utils";
export const inputNode = options => {
  const {
    schema,
    nodeInfo,
    prompts,
    inquirer,
    promptModule
  } = options;
  return toPromiseQuestionHandler({
    schema,
    nodeInfo,
    type: 'input',
    inquirer,
    promptModule,
    prompts
  });
};