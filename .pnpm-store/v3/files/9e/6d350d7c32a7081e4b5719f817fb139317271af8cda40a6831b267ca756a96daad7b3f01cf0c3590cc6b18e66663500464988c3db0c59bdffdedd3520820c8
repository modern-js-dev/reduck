"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStaticFileHandler = void 0;

var _serveStatic = _interopRequireDefault(require("serve-static"));

var _utils = require("@modern-js/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Todo 看看是不是能 fork 一份，即使命中也返回
const createStaticFileHandler = rules => // eslint-disable-next-line consistent-return
async (context, next) => {
  const {
    url: requestUrl,
    req,
    res
  } = context;
  const hitRule = rules.find(item => {
    if ((0, _utils.isString)(item.path) && requestUrl.startsWith(item.path)) {
      return true;
    } else if ((0, _utils.isRegExp)(item.path) && item.path.test(requestUrl)) {
      return true;
    }

    return false;
  });

  if (hitRule) {
    (0, _serveStatic.default)(hitRule.target)(req, res, () => {
      next();
    });
  } else {
    return next();
  }
};

exports.createStaticFileHandler = createStaticFileHandler;