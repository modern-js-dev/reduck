function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { getNodeInfo, isEffectedValue } from '@modern-js/easy-form-core';
export const getMessage = (schema, answers, extra) => answer => {
  if (typeof schema.label === 'function') {
    return schema.label(_objectSpread(_objectSpread({}, answers), answer), extra);
  }

  return schema.label || '';
};
export const getDefaultValue = (nodeInfo, answers) => {
  var _nodeInfo$state, _nodeInfo$state3;

  if (isEffectedValue((_nodeInfo$state = nodeInfo.state) === null || _nodeInfo$state === void 0 ? void 0 : _nodeInfo$state.value)) {
    var _nodeInfo$state2;

    return ((_nodeInfo$state2 = nodeInfo.state) === null || _nodeInfo$state2 === void 0 ? void 0 : _nodeInfo$state2.value).action(answers, {});
  }

  return (_nodeInfo$state3 = nodeInfo.state) === null || _nodeInfo$state3 === void 0 ? void 0 : _nodeInfo$state3.value;
};
export const getChoices = options => {
  const {
    schema,
    answers,
    customChoice,
    extra
  } = options;
  return answer => {
    let choices = [];

    if (typeof schema.items === 'function') {
      choices = schema.items(_objectSpread(_objectSpread({}, answers), answer), extra);
    } else {
      choices = schema.items || [];
    }

    let result = [];
    choices.forEach(x => {
      const nodeInfo = getNodeInfo(x, answers, extra);

      if (customChoice) {
        const _choices = customChoice({
          schema: x,
          answers,
          answer
        });

        result = result.concat(_choices);
      } else {
        const showChoice = !x.when || x.when(answers, extra);

        if (showChoice) {
          var _x$state, _x$state2, _x$state3;

          result.push({
            name: getMessage(x, answers, extra)(answer),
            value: getDefaultValue(nodeInfo, answers) || x.key,
            short: ((_x$state = x.state) === null || _x$state === void 0 ? void 0 : _x$state.short) || '',
            disabled: Boolean(nodeInfo.disabled),
            key: (_x$state2 = x.state) === null || _x$state2 === void 0 ? void 0 : _x$state2.key,
            checked: (_x$state3 = x.state) === null || _x$state3 === void 0 ? void 0 : _x$state3.checked
          });
        }
      }
    });
    return result;
  };
};
export const getValidate = (schema, answers, extra) => async answer => {
  if (typeof schema.validate === 'function') {
    const result = await schema.validate(answer, answers, extra);

    if (!result.success) {
      return result.error || '';
    }

    return true;
  }

  return true;
};
export const getFilter = (nodeInfo, type, answers) => {
  const isNumber = type === 'number';

  const getNumberAnswer = value => {
    let filteredValue = value;

    if (isNaN(parseInt(value, 10))) {
      filteredValue = value;
    } else {
      filteredValue = parseInt(value, 10);
    }

    return filteredValue;
  };

  return answer => {
    var _nodeInfo$state4;

    // There is a problem with the verification of number, so the type is changed to input, and the value is filtered here
    const _answer = isNumber ? getNumberAnswer(answer) : answer;

    if (typeof ((_nodeInfo$state4 = nodeInfo.state) === null || _nodeInfo$state4 === void 0 ? void 0 : _nodeInfo$state4.filter) === 'function') {
      var _nodeInfo$state5;

      return (_nodeInfo$state5 = nodeInfo.state) === null || _nodeInfo$state5 === void 0 ? void 0 : _nodeInfo$state5.filter(_answer, answers);
    }

    return _answer;
  };
};
export const getTransformer = (nodeInfo, answers) => answer => {
  var _nodeInfo$state6;

  if (typeof ((_nodeInfo$state6 = nodeInfo.state) === null || _nodeInfo$state6 === void 0 ? void 0 : _nodeInfo$state6.transformer) === 'function') {
    var _nodeInfo$state7;

    return (_nodeInfo$state7 = nodeInfo.state) === null || _nodeInfo$state7 === void 0 ? void 0 : _nodeInfo$state7.transformer(answer, answers);
  }

  return answer;
};
export const getWhen = (nodeInfo, answers) => answer => {
  if (typeof nodeInfo.when === 'function') {
    return nodeInfo.when(_objectSpread(_objectSpread({}, answers), answer), nodeInfo.extra);
  }

  return true;
};
export const getQuestion = options => {
  var _nodeInfo$state8, _nodeInfo$state9, _nodeInfo$state10;

  const {
    schema,
    nodeInfo,
    type,
    answers,
    customChoice
  } = options; // For the single-choice or multiple-choice relationship, choices exist.

  const hasChoices = _schema => {
    if (_schema.items && (_schema.mutualExclusion || _schema.coexit)) {
      return true;
    }

    return false;
  };

  const choices = hasChoices(schema) ? {
    choices: getChoices({
      schema,
      answers,
      customChoice,
      extra: nodeInfo.extra
    })
  } : {}; // Set the type to input and use the filter to convert to number
  // The reason is that there is a problem with the value verification of number

  const _type = type === 'number' ? 'input' : type;

  const defaultValue = getDefaultValue(nodeInfo, answers);
  const defaultField = defaultValue ? {
    default: defaultValue
  } : {};
  return _objectSpread(_objectSpread({
    type: _type,
    name: nodeInfo.id,
    message: getMessage(schema, answers, nodeInfo.extra),
    validate: getValidate(schema, answers, nodeInfo.extra)
  }, defaultField), {}, {
    filter: getFilter(nodeInfo, type, answers),
    when: getWhen(nodeInfo, answers),
    prefix: (_nodeInfo$state8 = nodeInfo.state) === null || _nodeInfo$state8 === void 0 ? void 0 : _nodeInfo$state8.prefix,
    suffix: (_nodeInfo$state9 = nodeInfo.state) === null || _nodeInfo$state9 === void 0 ? void 0 : _nodeInfo$state9.suffix,
    loop: ((_nodeInfo$state10 = nodeInfo.state) === null || _nodeInfo$state10 === void 0 ? void 0 : _nodeInfo$state10.loop) || false
  }, choices);
};

const when = (schema, answers, extra) => {
  if (schema.when && typeof schema.when === 'function') {
    return schema.when(answers, extra);
  } // When exists, it will be based on the result of when, otherwise it will be displayed by default


  return schema.hasOwnProperty('when') ? schema.when : true;
};

export const toPromiseQuestionHandler = options => {
  const {
    schema,
    nodeInfo,
    type,
    promptModule,
    prompts,
    customQuestionHandler,
    customChoice
  } = options;

  const ask = question => new Promise(resolve => {
    prompts.next(question);
    promptModule.ui.process.subscribe(answer => {
      if (answer.name === schema.key) {
        resolve(true);
      }
    });
  });

  return answers => {
    try {
      if (!when(schema, answers, nodeInfo.extra)) {
        return Promise.resolve(true);
      }

      const question = getQuestion({
        schema,
        nodeInfo,
        type,
        answers,
        customChoice
      });

      if (!customQuestionHandler) {
        return ask(question);
      }

      return customQuestionHandler({
        question,
        ask
      });
    } catch (error) {
      console.error(error);
      return Promise.resolve(false);
    }
  };
};
export const toPromiseQuestionHandlerLoop = questionHandlers => answers => // The root node itself is not a problem, so the sub-elements question are executed in order
new Promise(resolve => {
  try {
    const askQuestion = async questionHandler => {
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