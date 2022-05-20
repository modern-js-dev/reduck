import { NodeInfo } from '../interface/ISchema';
import { Schema, StateType } from '../types';

export const fieldValue = (
  key: keyof Schema,
  schema: Schema,
  data: Record<string, unknown>,
  extra?: Record<string, unknown>,
) => {
  if (schema[key] && typeof schema[key] === 'function') {
    return schema[key](data, extra);
  }
  return schema[key];
};

export const getSchemaLabel = (
  schema: Schema,
  data: Record<string, unknown>,
  extra?: Record<string, unknown>,
) => fieldValue('label', schema, data, extra) || '';

export const getSchemaDisabled = (
  schema: Schema,
  data: Record<string, unknown>,
  extra?: Record<string, unknown>,
): boolean => {
  if (!schema.state) {
    return false;
  }
  if (
    schema.state.hasOwnProperty('disabled') &&
    typeof schema.state.disabled === 'function'
  ) {
    return schema.state.disabled(data, extra);
  }
  return Boolean(schema.state?.disabled);
};

export const getSchemaType = (schema: Schema): string[] => {
  if (!schema.type) {
    return [];
  }
  return schema.type;
};

export const getSchemaDefaultState = (schema: Schema): StateType => {
  if (!schema.state || typeof schema.state === 'string') {
    return {
      default: false,
      disabled: false,
      required: false,
    };
  }
  return schema.state;
};

export const getNodeInfo = (
  schema: Schema,
  data: Record<string, unknown>, // Form data
  extra?: Record<string, unknown>,
): NodeInfo => ({
  label: getSchemaLabel(schema, data, extra),
  state: schema.state,
  formState: data,
  type: getSchemaType(schema),
  ...getSchemaDefaultState(schema),
  disabled: getSchemaDisabled(schema, data, extra),
  id: schema.key,
  validate: schema.validate,
  when: schema.when,
  desc: schema.desc,
  extra,
});
