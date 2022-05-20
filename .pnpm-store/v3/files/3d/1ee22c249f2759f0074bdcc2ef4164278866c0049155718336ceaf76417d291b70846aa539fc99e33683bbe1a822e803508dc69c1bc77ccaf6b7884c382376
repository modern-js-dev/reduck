"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllKeys = void 0;

var _itemsField = require("./itemsField");

const getAllKeys = schema => {
  const keys = [];

  const readKeys = _schema => {
    keys.push(_schema.key);

    if (_schema.items) {
      (0, _itemsField.getItems)(_schema).forEach(each => readKeys(each));
    }
  };

  readKeys(schema);
  return keys;
};

exports.getAllKeys = getAllKeys;