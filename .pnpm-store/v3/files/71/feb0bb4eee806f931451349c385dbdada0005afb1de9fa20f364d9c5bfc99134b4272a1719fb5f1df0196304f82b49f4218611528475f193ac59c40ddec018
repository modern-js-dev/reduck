const _excluded = ["path"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import nodePath from 'path';
import * as t from '@babel/types';
const REWRITE_TARGETS = {
  '@babel/runtime': nodePath.dirname(require.resolve('@babel/runtime/package.json')),
  'regenerator-runtime': nodePath.dirname(require.resolve('regenerator-runtime')),
  'core-js': nodePath.dirname(require.resolve('core-js/package.json'))
};

const matchedKey = value => Object.keys(REWRITE_TARGETS).find(name => value.startsWith(`${name}/`));

export default ((_, options) => ({
  post(_ref) {
    let {
      path
    } = _ref,
        stats = _objectWithoutProperties(_ref, _excluded);

    const {
      sourceFileName
    } = stats.opts;
    const {
      metaName
    } = options;
    const regExp = new RegExp(`node_modules(?!\\/\\.${metaName}\\/)`);

    if (regExp.test(sourceFileName)) {
      return;
    }

    path.node.body.forEach(node => {
      // import
      if (t.isImportDeclaration(node)) {
        const key = matchedKey(node.source.value);

        if (key) {
          node.source.value = node.source.value.replace(new RegExp(`^${key}\\/`), // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          `${REWRITE_TARGETS[key]}/`);
        }
      } // require


      if (t.isExpressionStatement(node) && t.isCallExpression(node.expression)) {
        const {
          callee
        } = node.expression;
        const source = node.expression.arguments[0];

        if (t.isIdentifier(callee) && callee.name === 'require') {
          const key = matchedKey(source.value);

          if (key) {
            source.value = source.value.replace(new RegExp(`^${key}\\/`), // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            `${REWRITE_TARGETS[key]}/`);
          }
        }
      }
    });
  }

}));