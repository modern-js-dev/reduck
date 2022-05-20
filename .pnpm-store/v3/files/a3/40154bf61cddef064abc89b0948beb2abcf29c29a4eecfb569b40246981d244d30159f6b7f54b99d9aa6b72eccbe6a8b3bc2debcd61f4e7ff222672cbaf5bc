"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBoolean = exports.mergeObjWithCombineArray = exports.booleanToString = void 0;

var _mergeWith2 = _interopRequireDefault(require("lodash/mergeWith"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mergeObjWithCombineArray = (src, obj) => {
  const customizer = (objValue, srcValue) => {
    if ((0, _isArray2.default)(objValue)) {
      return [...srcValue, ...objValue];
    }

    return undefined;
  };

  return (0, _mergeWith2.default)(src, obj, customizer);
};

exports.mergeObjWithCombineArray = mergeObjWithCombineArray;

const toBoolean = value => {
  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  return value;
};

exports.toBoolean = toBoolean;

const booleanToString = value => {
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  return value;
};

exports.booleanToString = booleanToString;