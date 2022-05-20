import _mergeWith from "lodash/mergeWith";
import _isArray from "lodash/isArray";
export const mergeObjWithCombineArray = (src, obj) => {
  const customizer = (objValue, srcValue) => {
    if (_isArray(objValue)) {
      return [...srcValue, ...objValue];
    }

    return undefined;
  };

  return _mergeWith(src, obj, customizer);
};
export const toBoolean = value => {
  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  return value;
};
export const booleanToString = value => {
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  return value;
};