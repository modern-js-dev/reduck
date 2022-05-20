import "../../ICliConfig";
import { toPromiseQuestionHandler, toPromiseQuestionHandlerLoop } from "../utils";
export const checkboxNode = options => {
  const {
    schema,
    nodeInfo,
    prompts,
    inquirer,
    promptModule,
    childNodes
  } = options;
  return async answers => {
    const listHandler = toPromiseQuestionHandler({
      schema,
      nodeInfo,
      prompts,
      inquirer,
      promptModule,
      type: 'checkbox'
    });
    const result = await listHandler(answers);

    if (result) {
      const childNodeHandler = toPromiseQuestionHandlerLoop(childNodes(answers));
      const childResult = await childNodeHandler(answers);
      return childResult;
    }

    return false;
  };
};