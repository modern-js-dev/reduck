import { getItems } from "./itemsField";
export const getAllKeys = schema => {
  const keys = [];

  const readKeys = _schema => {
    keys.push(_schema.key);

    if (_schema.items) {
      getItems(_schema).forEach(each => readKeys(each));
    }
  };

  readKeys(schema);
  return keys;
};