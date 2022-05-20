import {
  getNodeInfo,
  isEffectedValue,
  NodeInfo,
  Schema,
  SchemaEffectedValueType,
} from '@modern-js/easy-form-core';
import { Answers } from 'inquirer';
import {
  ChoiceType,
  IBaseNodeOptions,
  Question,
  QuestionHandler,
} from '../ICli';

export const getMessage =
  (
    schema: Schema,
    answers: Record<string, unknown>,
    extra?: Record<string, unknown>,
  ) =>
  (answer: any) => {
    if (typeof schema.label === 'function') {
      return schema.label(
        {
          ...answers,
          ...answer,
        },
        extra,
      );
    }
    return schema.label || '';
  };

export const getDefaultValue = (
  nodeInfo: NodeInfo,
  answers: Record<string, unknown>,
) => {
  if (isEffectedValue(nodeInfo.state?.value)) {
    return (nodeInfo.state?.value as SchemaEffectedValueType).action(
      answers,
      {},
    );
  }
  return nodeInfo.state?.value;
};

export type CustomChoiceType = (options: {
  schema: Schema;
  answers: Record<string, unknown>;
  answer: Record<string, unknown>;
}) => ChoiceType[];

export const getChoices = (options: {
  schema: Schema;
  answers: Record<string, unknown>;
  customChoice?: CustomChoiceType;
  extra?: Record<string, unknown>;
}): ((answer: Record<string, unknown>) => ChoiceType[]) => {
  const { schema, answers, customChoice, extra } = options;
  return (answer: Record<string, unknown>) => {
    let choices: Schema[] = [];
    if (typeof schema.items === 'function') {
      choices = schema.items(
        {
          ...answers,
          ...answer,
        },
        extra,
      );
    } else {
      choices = schema.items || [];
    }
    let result: ChoiceType[] = [];
    choices.forEach(x => {
      const nodeInfo = getNodeInfo(x, answers, extra);
      if (customChoice) {
        const _choices = customChoice({ schema: x, answers, answer });
        result = result.concat(_choices);
      } else {
        const showChoice = !x.when || x.when(answers, extra);
        if (showChoice) {
          result.push({
            name: getMessage(x, answers, extra)(answer),
            value: getDefaultValue(nodeInfo, answers) || x.key,
            short: x.state?.short || '',
            disabled: Boolean(nodeInfo.disabled),
            key: x.state?.key,
            checked: x.state?.checked,
          });
        }
      }
    });
    return result;
  };
};

export const getValidate =
  (
    schema: Schema,
    answers: Record<string, unknown>,
    extra?: Record<string, unknown>,
  ) =>
  async (answer: any) => {
    if (typeof schema.validate === 'function') {
      const result = await schema.validate(answer, answers, extra);
      if (!result.success) {
        return result.error || '';
      }
      return true;
    }
    return true;
  };

export const getFilter = (
  nodeInfo: NodeInfo,
  type: string,
  answers: Record<string, unknown>,
) => {
  const isNumber = type === 'number';
  const getNumberAnswer = (value: any) => {
    let filteredValue = value;
    if (isNaN(parseInt(value, 10))) {
      filteredValue = value;
    } else {
      filteredValue = parseInt(value, 10);
    }
    return filteredValue;
  };
  return (answer: any) => {
    // There is a problem with the verification of number, so the type is changed to input, and the value is filtered here
    const _answer = isNumber ? getNumberAnswer(answer) : answer;
    if (typeof nodeInfo.state?.filter === 'function') {
      return nodeInfo.state?.filter(_answer, answers);
    }
    return _answer;
  };
};
export const getTransformer =
  (nodeInfo: NodeInfo, answers: Record<string, unknown>) => (answer: any) => {
    if (typeof nodeInfo.state?.transformer === 'function') {
      return nodeInfo.state?.transformer(answer, answers);
    }
    return answer;
  };

export const getWhen =
  (nodeInfo: NodeInfo, answers: Record<string, unknown>) => (answer: any) => {
    if (typeof nodeInfo.when === 'function') {
      return nodeInfo.when(
        {
          ...answers,
          ...answer,
        },
        nodeInfo.extra,
      );
    }
    return true;
  };

export const getQuestion = (options: {
  schema: Schema;
  nodeInfo: NodeInfo;
  answers: Record<string, unknown>;
  type: string;
  customChoice?: CustomChoiceType;
}): Question => {
  const { schema, nodeInfo, type, answers, customChoice } = options;
  // For the single-choice or multiple-choice relationship, choices exist.
  const hasChoices = (_schema: Schema) => {
    if (_schema.items && (_schema.mutualExclusion || _schema.coexit)) {
      return true;
    }
    return false;
  };
  const choices = hasChoices(schema)
    ? {
        choices: getChoices({
          schema,
          answers,
          customChoice,
          extra: nodeInfo.extra,
        }),
      }
    : {};
  // Set the type to input and use the filter to convert to number
  // The reason is that there is a problem with the value verification of number
  const _type = type === 'number' ? 'input' : type;
  const defaultValue = getDefaultValue(nodeInfo, answers);
  const defaultField = defaultValue
    ? {
        default: defaultValue,
      }
    : {};
  return {
    type: _type as any,
    name: nodeInfo.id,
    message: getMessage(schema, answers, nodeInfo.extra),
    validate: getValidate(schema, answers, nodeInfo.extra),
    ...defaultField,
    filter: getFilter(nodeInfo, type, answers),
    when: getWhen(nodeInfo, answers),
    prefix: nodeInfo.state?.prefix,
    suffix: nodeInfo.state?.suffix,
    loop: nodeInfo.state?.loop || false,
    ...choices,
  };
};
export type PromiseQuestionHandlerOptions = IBaseNodeOptions & {
  schema: Schema;
  nodeInfo: NodeInfo;
  type: string;
  customChoice?: CustomChoiceType; // Custom option structure
  customQuestionHandler?: (options: {
    question: Question;
    ask: (question: Question) => Promise<boolean>;
  }) => Promise<boolean>;
  extra?: Record<string, unknown>;
};

const when = (
  schema: Schema,
  answers: Record<string, unknown>,
  extra?: Record<string, unknown>,
) => {
  if (schema.when && typeof schema.when === 'function') {
    return schema.when(answers, extra);
  }
  // When exists, it will be based on the result of when, otherwise it will be displayed by default
  return schema.hasOwnProperty('when') ? schema.when : true;
};

export const toPromiseQuestionHandler = (
  options: PromiseQuestionHandlerOptions,
): QuestionHandler => {
  const {
    schema,
    nodeInfo,
    type,
    promptModule,
    prompts,
    customQuestionHandler,
    customChoice,
  } = options;

  const ask = (question: Question): Promise<boolean> =>
    new Promise(resolve => {
      prompts.next(question);
      promptModule.ui.process.subscribe((answer: Answers) => {
        if (answer.name === schema.key) {
          resolve(true);
        }
      });
    });
  return (answers: Record<string, unknown>) => {
    try {
      if (!when(schema, answers, nodeInfo.extra)) {
        return Promise.resolve(true);
      }
      const question = getQuestion({
        schema,
        nodeInfo,
        type,
        answers,
        customChoice,
      });
      if (!customQuestionHandler) {
        return ask(question);
      }
      return customQuestionHandler({ question, ask });
    } catch (error) {
      console.error(error);
      return Promise.resolve(false);
    }
  };
};

export const toPromiseQuestionHandlerLoop =
  (questionHandlers: QuestionHandler[]): QuestionHandler =>
  (answers: Record<string, unknown>) =>
    // The root node itself is not a problem, so the sub-elements question are executed in order
    new Promise(resolve => {
      try {
        const askQuestion = async (questionHandler?: QuestionHandler) => {
          if (!questionHandler) {
            resolve(true);
            return;
          }
          const result = await questionHandler(answers);
          if (result) {
            askQuestion(questionHandlers.shift());
          } else {
            console.error('exec error:');
            resolve(true);
          }
        };
        askQuestion(questionHandlers.shift());
      } catch (error) {
        console.error('toPromiseQuestionHandlerLoop error:', error);
        resolve(true);
      }
    });
