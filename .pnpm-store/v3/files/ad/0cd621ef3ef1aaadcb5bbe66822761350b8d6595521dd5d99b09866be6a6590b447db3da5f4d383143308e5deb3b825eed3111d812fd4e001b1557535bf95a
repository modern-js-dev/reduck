"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSchemaType = exports.getSchemaLabel = exports.getSchemaDisabled = exports.getSchemaDefaultState = exports.getNodeInfo = exports.fieldValue = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const fieldValue = (key, schema, data, extra) => {
  if (schema[key] && typeof schema[key] === 'function') {
    return schema[key](data, extra);
  }

  return schema[key];
};

exports.fieldValue = fieldValue;

const getSchemaLabel = (schema, data, extra) => fieldValue('label', schema, data, extra) || '';

exports.getSchemaLabel = getSchemaLabel;

const getSchemaDisabled = (schema, data, extra) => {
  var _schema$state;

  if (!schema.state) {
    return false;
  }

  if (schema.state.hasOwnProperty('disabled') && typeof schema.state.disabled === 'function') {
    return schema.state.disabled(data, extra);
  }

  return Boolean((_schema$state = schema.state) === null || _schema$state === void 0 ? void 0 : _schema$state.disabled);
};

exports.getSchemaDisabled = getSchemaDisabled;

const getSchemaType = schema => {
  if (!schema.type) {
    return [];
  }

  return schema.type;
};

exports.getSchemaType = getSchemaType;

const getSchemaDefaultState = schema => {
  if (!schema.state || typeof schema.state === 'string') {
    return {
      default: false,
      disabled: false,
      required: false
    };
  }

  return schema.state;
};

exports.getSchemaDefaultState = getSchemaDefaultState;

const getNodeInfo = (schema, data, extra) => _objectSpread(_objectSpread({
  label: getSchemaLabel(schema, data, extra),
  state: schema.state,
  formState: data,
  type: getSchemaType(schema)
}, getSchemaDefaultState(schema)), {}, {
  disabled: getSchemaDisabled(schema, data, extra),
  id: schema.key,
  validate: schema.validate,
  when: schema.when,
  desc: schema.desc,
  extra
});

exports.getNodeInfo = getNodeInfo;