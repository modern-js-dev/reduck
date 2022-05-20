"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItems = void 0;

// Only get items that meet the when condition
const getItems = (schema, data = {}, extra) => {
  let result = [];

  if (schema.items && typeof schema.items === 'function') {
    result = schema.items(data, extra);
  } else {
    result = schema.items || [];
  }

  return result;
};

exports.getItems = getItems;