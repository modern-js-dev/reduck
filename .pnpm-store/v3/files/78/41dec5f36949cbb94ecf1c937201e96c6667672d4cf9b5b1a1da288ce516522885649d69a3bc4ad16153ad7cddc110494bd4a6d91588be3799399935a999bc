"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDefaultExportFunction = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _parser = require("@babel/parser");

var _traverse = _interopRequireDefault(require("@babel/traverse"));

var t = _interopRequireWildcard(require("@babel/types"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isFunction = node => t.isFunctionDeclaration(node) || t.isFunctionExpression(node) || t.isArrowFunctionExpression(node);

const isDefaultExportFunction = file => {
  if (!file || !_fs.default.existsSync(file)) {
    return false;
  }

  const ast = (0, _parser.parse)(_fs.default.readFileSync(file, 'utf8'), {
    sourceType: 'unambiguous',
    plugins: ['jsx', 'typescript', 'classProperties', 'dynamicImport', 'exportDefaultFrom', 'exportNamespaceFrom', 'decorators-legacy', 'functionBind', 'classPrivateMethods', ['pipelineOperator', {
      proposal: 'minimal'
    }], 'optionalChaining', 'optionalCatchBinding', 'objectRestSpread', 'numericSeparator']
  });
  let isExportFunction = false;
  (0, _traverse.default)(ast, {
    ExportDefaultDeclaration: path => {
      const {
        declaration
      } = path.node;

      if (isFunction(declaration)) {
        isExportFunction = true;
      }
    }
  });
  return isExportFunction;
};

exports.isDefaultExportFunction = isDefaultExportFunction;