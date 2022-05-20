import "../../ICliConfig";
export const rootNode = options => {
  const {
    childQuestionHandler,
    prompts
  } = options;
  return async answers => {
    if (childQuestionHandler) {
      await childQuestionHandler(answers);
    }

    prompts.complete();
    return true;
  };
};