// Only get items that meet the when condition
export var getItems = function getItems(schema) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var extra = arguments.length > 2 ? arguments[2] : undefined;
  var result = [];

  if (schema.items && typeof schema.items === 'function') {
    result = schema.items(data, extra);
  } else {
    result = schema.items || [];
  }

  return result;
};