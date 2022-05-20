import { Schema } from '../types';

// Only get items that meet the when condition
export const getItems = (
  schema: Schema,
  data: Record<string, unknown> = {},
  extra?: Record<string, unknown>,
) => {
  let result: Schema[] = [];
  if (schema.items && typeof schema.items === 'function') {
    result = schema.items(data, extra);
  } else {
    result = (schema.items as Schema[]) || [];
  }
  return result;
};
