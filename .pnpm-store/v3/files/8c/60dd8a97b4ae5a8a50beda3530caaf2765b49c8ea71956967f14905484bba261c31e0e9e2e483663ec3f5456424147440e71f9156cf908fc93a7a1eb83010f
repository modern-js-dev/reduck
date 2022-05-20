import _cloneDeep from "lodash/cloneDeep";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import { getItems } from "./itemsField";
import { booleanToString, toBoolean } from "./tools";
export var setSchemaInitValue = function setSchemaInitValue(schema, initValue) {
  var _schema$state$value, _schema$state$value2;

  if (initValue === undefined || initValue === null) {
    return;
  }

  schema.state = schema.state || {};

  if ((_schema$state$value = schema.state.value) !== null && _schema$state$value !== void 0 && _schema$state$value.hasOwnProperty('effectedByFields') && (_schema$state$value2 = schema.state.value) !== null && _schema$state$value2 !== void 0 && _schema$state$value2.hasOwnProperty('action')) {
    // It is a side effect function, when setting the default value, the function form is still retained
    // Pass in the default value in the form of lastValue
    var value = schema.state.value;

    if (typeof value.action === 'function') {
      schema.state.value = {
        effectedByFields: value.effectedByFields,
        action: function action(data, lastValue) {
          return value.action(data, lastValue || initValue);
        }
      };
    }
  } else {
    schema.state.value = initValue;
  }
};
export var setInitValues = function setInitValues(schema, initValues) {
  // When setting the value, note that the Boolean value needs to be a string
  var result = _cloneDeep(schema);

  var doSetInitValue = function doSetInitValue(_schema) {
    setSchemaInitValue(_schema, initValues[_schema.key]);

    if (_schema.items) {
      getItems(_schema).forEach(function (each) {
        return doSetInitValue(each);
      });
    }
  };

  doSetInitValue(result);
  return result;
}; // Determine whether it is a side effect value, that is, the point affected by other fields

export var isEffectedValue = function isEffectedValue(schemaValue) {
  if (!schemaValue) {
    return false;
  }

  if (Array.isArray(schemaValue)) {
    return false;
  }

  if (_typeof(schemaValue) === 'object' && schemaValue.action && typeof schemaValue.action === 'function') {
    return true;
  }

  return false;
}; // For a node without a value type, if it is selected, the returned value is schema.state?.value || schema.key
// The rest will return schema.key
// If it is boolean, return boolean

export var getNoTypeNodeDefaultValue = function getNoTypeNodeDefaultValue(node) {
  var schemaValue = node.schemaValue,
      key = node.key,
      type = node.type;

  if (!type || type.length === 0 && ['number', 'string', 'boolean'].includes(_typeof(schemaValue))) {
    return schemaValue || toBoolean(key);
  }

  return toBoolean(key);
}; // Use this function to obtain the value field of a single-select or multiple-select item

export var getItemValue = function getItemValue(node) {
  return booleanToString(getNoTypeNodeDefaultValue({
    schemaValue: node.schemaValue,
    key: node.key,
    type: node.type
  }));
};