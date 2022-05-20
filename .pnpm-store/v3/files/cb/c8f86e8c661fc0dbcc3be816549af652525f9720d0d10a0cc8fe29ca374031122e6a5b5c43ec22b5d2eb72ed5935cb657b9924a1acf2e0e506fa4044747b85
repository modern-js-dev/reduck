"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMockHandler = void 0;

var _path = _interopRequireDefault(require("path"));

var _utils = require("@modern-js/utils");

var _prodServer = require("@modern-js/prod-server");

var _getMockData = _interopRequireWildcard(require("./getMockData"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createMockHandler = ({
  pwd
}) => {
  const exts = ['.ts', '.js'];
  let filepath = '';

  for (const ext of exts) {
    const maybeMatch = _path.default.join(pwd, `${_prodServer.AGGRED_DIR.mock}/index${ext}`);

    if (_utils.fs.existsSync(maybeMatch)) {
      filepath = maybeMatch;
      break;
    }
  }

  if (!filepath) {
    return null;
  }

  const apiList = (0, _getMockData.default)(filepath);

  if (!apiList || apiList.length === 0) {
    return null;
  }

  return async (context, next) => {
    const {
      res
    } = context;
    const matched = (0, _getMockData.getMatched)(context, apiList);

    if (!matched) {
      return next();
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    return matched.handler(context, next);
  };
};

exports.createMockHandler = createMockHandler;