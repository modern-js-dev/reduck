"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSchemaInitValue = exports.setInitValues = exports.isEffectedValue = exports.getNoTypeNodeDefaultValue = exports.getItemValue = void 0;

var _cloneDeep2 = _interopRequireDefault(require("lodash/cloneDeep"));

var _itemsField = require("./itemsField");

var _tools = require("./tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setSchemaInitValue = (schema, initValue) => {
  var _schema$state$value, _schema$state$value2;

  if (initValue === undefined || initValue === null) {
    return;
  }

  schema.state = schema.state || {};

  if ((_schema$state$value = schema.state.value) !== null && _schema$state$value !== void 0 && _schema$state$value.hasOwnProperty('effectedByFields') && (_schema$state$value2 = schema.state.value) !== null && _schema$state$value2 !== void 0 && _schema$state$value2.hasOwnProperty('action')) {
    // It is a side effect function, when setting the default value, the function form is still retained
    // Pass in the default value in the form of lastValue
    const value = schema.state.value;

    if (typeof value.action === 'function') {
      schema.state.value = {
        effectedByFields: value.effectedByFields,
        action: (data, lastValue) => value.action(data, lastValue || initValue)
      };
    }
  } else {
    schema.state.value = initValue;
  }
};

exports.setSchemaInitValue = setSchemaInitValue;

const setInitValues = (schema, initValues) => {
  // When setting the value, note that the Boolean value needs to be a string
  const result = (0, _cloneDeep2.default)(schema);

  const doSetInitValue = _schema => {
    setSchemaInitValue(_schema, initValues[_schema.key]);

    if (_schema.items) {
      (0, _itemsField.getItems)(_schema).forEach(each => doSetInitValue(each));
    }
  };

  doSetInitValue(result);
  return result;
}; // Determine whether it is a side effect value, that is, the point affected by other fields


exports.setInitValues = setInitValues;

const isEffectedValue = schemaValue => {
  if (!schemaValue) {
    return false;
  }

  if (Array.isArray(schemaValue)) {
    return false;
  }

  if (typeof schemaValue === 'object' && schemaValue.action && typeof schemaValue.action === 'function') {
    return true;
  }

  return false;
}; // For a node without a value type, if it is selected, the returned value is schema.state?.value || schema.key
// The rest will return schema.key
// If it is boolean, return boolean


exports.isEffectedValue = isEffectedValue;

const getNoTypeNodeDefaultValue = node => {
  const {
    schemaValue,
    key,
    type
  } = node;

  if (!type || type.length === 0 && ['number', 'string', 'boolean'].includes(typeof schemaValue)) {
    return schemaValue || (0, _tools.toBoolean)(key);
  }

  return (0, _tools.toBoolean)(key);
}; // Use this function to obtain the value field of a single-select or multiple-select item


exports.getNoTypeNodeDefaultValue = getNoTypeNodeDefaultValue;

const getItemValue = node => (0, _tools.booleanToString)(getNoTypeNodeDefaultValue({
  schemaValue: node.schemaValue,
  key: node.key,
  type: node.type
}));

exports.getItemValue = getItemValue;