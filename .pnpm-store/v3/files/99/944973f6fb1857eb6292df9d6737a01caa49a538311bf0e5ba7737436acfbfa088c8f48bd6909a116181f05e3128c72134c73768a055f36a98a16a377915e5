import { Schema } from '../types';
import { getItems } from './itemsField';
import { setSchemaInitValue } from './stateField';

// Foreach with key chain
export const forEachWithKeyChain = (
  schema: Schema,
  handler: (options: {
    schema: Schema;
    keyChain: string;
    defaultHandlers: {
      setSchemaInitValue: typeof setSchemaInitValue;
    };
  }) => boolean | undefined,
) => {
  const doForeach = (_schema: Schema, keyChain: string) => {
    const result = handler({
      schema: _schema,
      keyChain,
      defaultHandlers: {
        setSchemaInitValue,
      },
    });
    if (result === false) {
      return;
    }
    if (_schema.items) {
      getItems(_schema).forEach(each =>
        doForeach(each, keyChain ? `${keyChain}.${_schema.key}` : _schema.key),
      );
    }
  };
  doForeach(schema, '');
  return schema;
};

export const forEach = (
  schema: Schema,
  handler: (
    schema: Schema,
    defaultHandlers: {
      setSchemaInitValue: typeof setSchemaInitValue;
    },
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  ) => boolean | undefined | void, // Return true to terminate the loop
) => {
  const doForeach = (_schema: Schema) => {
    const result = handler(_schema, {
      setSchemaInitValue,
    });
    if (result === false) {
      return;
    }
    if (_schema.items) {
      getItems(_schema).forEach(each => doForeach(each));
    }
  };
  doForeach(schema);
  return schema;
};

// Filter out values of type none
export const filterNone = (schema: Schema, originData: any): any => {
  const needKeys: string[] = [];

  const isNone = (obj: Schema) => {
    if (!obj.type) {
      return false;
    }
    return obj.type.includes('none');
  };
  const doSchema = (_schema: Schema) => {
    if (_schema.isObject) {
      (_schema.items as any[]).forEach((each: Schema) => {
        doSchema(each);
      });
    } else if ((_schema.mutualExclusion || _schema.coexit) && _schema.type) {
      if (!isNone(_schema)) {
        needKeys.push(_schema.key);
      }

      (_schema.items as any[]).forEach((each: Schema) => {
        doSchema(each);
      });
    } else if (_schema.type) {
      if (!isNone(_schema)) {
        needKeys.push(_schema.key);
      }
    }
  };
  doSchema(schema);
  const result: any = {};
  for (const key of needKeys) {
    result[key] = originData[key];
  }
  return result;
};

export const filter = (schema: Schema, originData: any): any => {
  const needKeys: string[] = [];

  const findItem = (key: string, _schema: any): Schema | null => {
    const tmp = _schema;
    if (tmp.key === key.toString()) {
      return tmp;
    }
    if (!tmp.items) {
      return null;
    }
    let target: Schema | null = null;
    for (const item of tmp.items) {
      target = findItem(key, item);
      if (target) {
        break;
      }
    }
    return target;
  };

  const doSchema = (_schema: Schema) => {
    const isNone = (obj: Schema) => {
      if (!obj.type) {
        return false;
      }
      return obj.type.includes('none');
    };

    if (_schema.isObject) {
      (_schema.items as any[]).forEach((each: Schema) => {
        doSchema(each);
      });
    } else if (_schema.mutualExclusion && _schema.type) {
      // The root node is a selection type, then the value of its selection is the key of an option in its child element
      const choosedKey: string = originData[_schema.key];
      const targetItem: Schema | null = findItem(choosedKey, _schema);

      if (targetItem) {
        if (!isNone(_schema)) {
          needKeys.push(_schema.key);
        }

        doSchema(targetItem);
      }
    } else if (_schema.type) {
      if (!isNone(_schema)) {
        needKeys.push(_schema.key);
      }
    }
  };

  doSchema(schema);
  const result: any = {};
  for (const key of needKeys) {
    result[key] = originData[key];
  }
  return result;
};
