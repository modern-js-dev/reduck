import { Schema } from './interface/ISchema';
import { MESSAGE } from './constant';
import { getItems, forEach } from './utils';

const checkFieldType = (schema: Schema) => {
  // field type detection
  if (schema.key && typeof schema.key !== 'string') {
    throw Error(MESSAGE.PARAM_TYPE_IS_INVALID('key', 'string'));
  }
  // if (schema.label && typeof schema.label !== 'string') {
  //   throw Error(MESSAGE.PARAM_TYPE_IS_INVALID('label', 'string'));
  // }
  if (schema.mutualExclusion && typeof schema.mutualExclusion !== 'boolean') {
    throw Error(MESSAGE.PARAM_TYPE_IS_INVALID('mutualExclusion', 'boolean'));
  }
  if (schema.isObject && typeof schema.isObject !== 'boolean') {
    throw Error(MESSAGE.PARAM_TYPE_IS_INVALID('isObject', 'boolean'));
  }
  if (schema.coexit && typeof schema.coexit !== 'boolean') {
    throw Error(MESSAGE.PARAM_TYPE_IS_INVALID('coexit', 'boolean'));
  }
  if (schema.state && !['string', 'object'].includes(typeof schema.state)) {
    throw Error(MESSAGE.PARAM_TYPE_IS_INVALID('key', 'string | object'));
  }
  if (schema.type && !Array.isArray(schema.type)) {
    throw Error(MESSAGE.PARAM_TYPE_IS_INVALID('key', 'string[]'));
  }
};

const checkRelation = (schema: Schema) => {
  // Relational field detection
  // If it is describing the sublevel relational data, it exists: mutualExclusion, coexit
  // The items field needs to exist, which can be [], and type must exist, and it is: string
  if (schema.mutualExclusion || schema.coexit) {
    if (!schema.items) {
      throw Error(MESSAGE.SHOULD_HAS_ITEMS_WITH_CONNECTION(schema.key));
    }
    if (!schema.type) {
      throw Error(MESSAGE.SHOULD_HAS_TYPE_WITH_CONNECTION(schema.key));
    }

    if (schema.isObject) {
      throw Error(MESSAGE.SHOULD_NOT_BE_OBJECT_WITH_CONNECTION(schema.key));
    }
  }

  // If there are items, you need to define the level relationship within their own elements
  if (
    schema.items &&
    !schema.mutualExclusion &&
    !schema.coexit &&
    !schema.isObject
  ) {
    throw Error(MESSAGE.SHOULD_HAS_RELATION(schema.key));
  }

  // If isObject, there must be items
  if (schema.isObject && !schema.items) {
    throw Error(MESSAGE.SHOULD_HAS_ITEMS_WITH_OBJECT(schema.key));
  }
};

const checkKeyExist = (schema: Schema) => {
  if (!schema.key) {
    throw Error(MESSAGE.KEY_IS_NOT_DEFINED);
  }
};

// Check the keys of the same level, and cannot be repeated
const checkRepeatItems = (schema: Schema, extra?: Record<string, unknown>) => {
  if (schema.items && schema.items.length > 0) {
    const items = getItems(schema, {}, extra);
    const keys = items.map(x => x.key);
    const tmp: string[] = [];
    const repeatKeys: string[] = [];
    keys.forEach(x => {
      if (tmp.includes(x)) {
        repeatKeys.push(x);
      } else {
        tmp.push(x);
      }
    });
    if (repeatKeys.length > 0) {
      throw Error(
        `schema(${schema.key}) items has repeat keys: ${repeatKeys.join(',')}`,
      );
    }
  }
};

export const checkSchema = (
  schema: Schema,
  extra?: Record<string, unknown>,
) => {
  // Key with value
  const fieldKeys: string[] = [];
  // Duplicate fieldKeys
  const repeatFieldKeys: string[] = [];

  // Check the key of the global field with value, it cannot be repeated, the value of the form will be overwritten after repeated
  const checkRepeatFieldKeys = (_schema: Schema) => {
    if (!_schema.type || _schema.type.length <= 0) {
      // Non-value type key, no judgment
      return;
    }
    if (!fieldKeys.includes(_schema.key)) {
      fieldKeys.push(_schema.key);
    } else {
      repeatFieldKeys.push(_schema.key);
    }
  };

  forEach(schema, (_schema: Schema) => {
    checkKeyExist(_schema);
    checkFieldType(_schema);
    checkRelation(_schema);
    checkRepeatFieldKeys(_schema);
    checkRepeatItems(_schema, extra);
  });

  if (repeatFieldKeys.length > 0) {
    // console.warn(
    //   `schema has repeat keys: ${repeatFieldKeys.join(
    //     ',',
    //   )}， if you think this is ok (such as the field of key with 'true | false', do not has value ), then you can ignore this!`,
    // );
  }
};
