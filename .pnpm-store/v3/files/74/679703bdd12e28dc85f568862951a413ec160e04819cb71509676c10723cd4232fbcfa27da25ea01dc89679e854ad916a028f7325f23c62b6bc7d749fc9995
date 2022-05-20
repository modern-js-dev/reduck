import { Schema } from '../types';
import { getItems } from './itemsField';

export const getAllKeys = (schema: Schema): string[] => {
  const keys: string[] = [];
  const readKeys = (_schema: Schema): any => {
    keys.push(_schema.key);
    if (_schema.items) {
      getItems(_schema).forEach(each => readKeys(each));
    }
  };
  readKeys(schema);
  return keys;
};
