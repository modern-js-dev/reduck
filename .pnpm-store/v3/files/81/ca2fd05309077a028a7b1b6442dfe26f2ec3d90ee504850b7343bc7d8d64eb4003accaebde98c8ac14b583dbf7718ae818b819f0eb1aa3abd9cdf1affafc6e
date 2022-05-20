import "../../ICliConfig";
import { toPromiseQuestionHandlerLoop } from "../utils";
export const childNode = options => {
  const {
    childQuestionHandler
  } = options; // Non-root node is an array

  if (Array.isArray(childQuestionHandler)) {
    return toPromiseQuestionHandlerLoop(childQuestionHandler);
  } // Sub-form of the root node


  return async answers => {
    // The root node itself is not a problem, so directly execute the child element problem
    if (childQuestionHandler) {
      await childQuestionHandler(answers);
    }

    return true;
  };
};