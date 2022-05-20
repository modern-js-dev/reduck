import "../../ICliConfig";
import { toPromiseQuestionHandler, toPromiseQuestionHandlerLoop } from "../utils";
export const listNode = options => {
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
      type: 'list'
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