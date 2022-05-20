"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generate = void 0;

var _common = require("./common");

const generate = (options, chain) => {
  const {
    useTsLoader
  } = options;
  const commonChain = (0, _common.genCommon)(options);

  if (useTsLoader) {
    return chain.merge(commonChain);
  }

  chain.plugin('@babel/plugin-transform-destructuring').use(require.resolve('@babel/plugin-transform-destructuring'), [{
    // Use loose mode for performance:
    // https://github.com/facebook/create-react-app/issues/5602
    loose: false,
    selectiveLoose: ['useState', 'useEffect', 'useContext', 'useReducer', 'useCallback', 'useMemo', 'useRef', 'useImperativeHandle', 'useLayoutEffect', 'useDebugValue']
  }]);
  return chain.merge(commonChain);
};

exports.generate = generate;