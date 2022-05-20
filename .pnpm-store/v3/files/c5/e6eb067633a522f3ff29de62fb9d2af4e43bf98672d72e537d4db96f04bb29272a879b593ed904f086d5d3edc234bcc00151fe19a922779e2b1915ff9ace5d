import { getItems } from "./itemsField";
export var getAllKeys = function getAllKeys(schema) {
  var keys = [];

  var readKeys = function readKeys(_schema) {
    keys.push(_schema.key);

    if (_schema.items) {
      getItems(_schema).forEach(function (each) {
        return readKeys(each);
      });
    }
  };

  readKeys(schema);
  return keys;
};