"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmptyObject = isEmptyObject;
exports.isObject = isObject;
const {
  hasOwnProperty
} = Object.prototype;

function isEmptyObject(obj) {
  if (!isObject(obj)) {
    return false;
  }

  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      return false;
    }
  }

  return true;
}

function isObject(obj) {
  // The method can't do a type cast since there are type (like strings) which
  // are subclasses of any put not positvely matched by the function. Hence type
  // narrowing results in wrong results.
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj) && !(obj instanceof RegExp) && !(obj instanceof Date);
}