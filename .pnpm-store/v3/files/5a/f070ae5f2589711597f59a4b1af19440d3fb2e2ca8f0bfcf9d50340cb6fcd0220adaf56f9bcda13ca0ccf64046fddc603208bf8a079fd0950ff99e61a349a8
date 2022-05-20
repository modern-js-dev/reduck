"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEachWithKeyChain = exports.forEach = exports.filterNone = exports.filter = void 0;

var _itemsField = require("./itemsField");

var _stateField = require("./stateField");

// Foreach with key chain
const forEachWithKeyChain = (schema, handler) => {
  const doForeach = (_schema, keyChain) => {
    const result = handler({
      schema: _schema,
      keyChain,
      defaultHandlers: {
        setSchemaInitValue: _stateField.setSchemaInitValue
      }
    });

    if (result === false) {
      return;
    }

    if (_schema.items) {
      (0, _itemsField.getItems)(_schema).forEach(each => doForeach(each, keyChain ? `${keyChain}.${_schema.key}` : _schema.key));
    }
  };

  doForeach(schema, '');
  return schema;
};

exports.forEachWithKeyChain = forEachWithKeyChain;

const forEach = (schema, handler // Return true to terminate the loop
) => {
  const doForeach = _schema => {
    const result = handler(_schema, {
      setSchemaInitValue: _stateField.setSchemaInitValue
    });

    if (result === false) {
      return;
    }

    if (_schema.items) {
      (0, _itemsField.getItems)(_schema).forEach(each => doForeach(each));
    }
  };

  doForeach(schema);
  return schema;
}; // Filter out values of type none


exports.forEach = forEach;

const filterNone = (schema, originData) => {
  const needKeys = [];

  const isNone = obj => {
    if (!obj.type) {
      return false;
    }

    return obj.type.includes('none');
  };

  const doSchema = _schema => {
    if (_schema.isObject) {
      _schema.items.forEach(each => {
        doSchema(each);
      });
    } else if ((_schema.mutualExclusion || _schema.coexit) && _schema.type) {
      if (!isNone(_schema)) {
        needKeys.push(_schema.key);
      }

      _schema.items.forEach(each => {
        doSchema(each);
      });
    } else if (_schema.type) {
      if (!isNone(_schema)) {
        needKeys.push(_schema.key);
      }
    }
  };

  doSchema(schema);
  const result = {};

  for (const key of needKeys) {
    result[key] = originData[key];
  }

  return result;
};

exports.filterNone = filterNone;

const filter = (schema, originData) => {
  const needKeys = [];

  const findItem = (key, _schema) => {
    const tmp = _schema;

    if (tmp.key === key.toString()) {
      return tmp;
    }

    if (!tmp.items) {
      return null;
    }

    let target = null;

    for (const item of tmp.items) {
      target = findItem(key, item);

      if (target) {
        break;
      }
    }

    return target;
  };

  const doSchema = _schema => {
    const isNone = obj => {
      if (!obj.type) {
        return false;
      }

      return obj.type.includes('none');
    };

    if (_schema.isObject) {
      _schema.items.forEach(each => {
        doSchema(each);
      });
    } else if (_schema.mutualExclusion && _schema.type) {
      // The root node is a selection type, then the value of its selection is the key of an option in its child element
      const choosedKey = originData[_schema.key];
      const targetItem = findItem(choosedKey, _schema);

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
  const result = {};

  for (const key of needKeys) {
    result[key] = originData[key];
  }

  return result;
};

exports.filter = filter;