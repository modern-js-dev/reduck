import _cloneDeep from "lodash/cloneDeep";
import { getItems } from "./itemsField";
import { booleanToString, toBoolean } from "./tools";
export const setSchemaInitValue = (schema, initValue) => {
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
export const setInitValues = (schema, initValues) => {
  // When setting the value, note that the Boolean value needs to be a string
  const result = _cloneDeep(schema);

  const doSetInitValue = _schema => {
    setSchemaInitValue(_schema, initValues[_schema.key]);

    if (_schema.items) {
      getItems(_schema).forEach(each => doSetInitValue(each));
    }
  };

  doSetInitValue(result);
  return result;
}; // Determine whether it is a side effect value, that is, the point affected by other fields

export const isEffectedValue = schemaValue => {
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

export const getNoTypeNodeDefaultValue = node => {
  const {
    schemaValue,
    key,
    type
  } = node;

  if (!type || type.length === 0 && ['number', 'string', 'boolean'].includes(typeof schemaValue)) {
    return schemaValue || toBoolean(key);
  }

  return toBoolean(key);
}; // Use this function to obtain the value field of a single-select or multiple-select item

export const getItemValue = node => booleanToString(getNoTypeNodeDefaultValue({
  schemaValue: node.schemaValue,
  key: node.key,
  type: node.type
}));