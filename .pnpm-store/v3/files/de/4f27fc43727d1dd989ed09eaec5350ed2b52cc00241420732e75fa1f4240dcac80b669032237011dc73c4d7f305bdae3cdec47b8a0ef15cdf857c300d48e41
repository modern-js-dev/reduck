import { genCommon } from "./common";
export const generate = (options, chain) => {
  const {
    useTsLoader
  } = options;
  const commonChain = genCommon(options);

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