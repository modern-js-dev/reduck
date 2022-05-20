// Only get items that meet the when condition
export const getItems = (schema, data = {}, extra) => {
  let result = [];

  if (schema.items && typeof schema.items === 'function') {
    result = schema.items(data, extra);
  } else {
    result = schema.items || [];
  }

  return result;
};