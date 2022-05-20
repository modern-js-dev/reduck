import "../../ICliConfig";
import { toPromiseQuestionHandler } from "../utils";
export const numberNode = options => {
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
    type: 'number',
    inquirer,
    promptModule,
    prompts
  });
};