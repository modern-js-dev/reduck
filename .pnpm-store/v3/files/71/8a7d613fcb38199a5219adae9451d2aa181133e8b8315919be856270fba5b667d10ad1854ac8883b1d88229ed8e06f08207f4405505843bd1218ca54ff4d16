import { isArray, mergeWith } from 'lodash';

export const mergeObjWithCombineArray = (src: any, obj: any) => {
  const customizer = (objValue: any, srcValue: any) => {
    if (isArray(objValue)) {
      return [...srcValue, ...objValue];
    }
    return undefined;
  };
  return mergeWith(src, obj, customizer);
};

export const toBoolean = (value: string) => {
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  return value;
};

export const booleanToString = (value: any) => {
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  return value;
};
