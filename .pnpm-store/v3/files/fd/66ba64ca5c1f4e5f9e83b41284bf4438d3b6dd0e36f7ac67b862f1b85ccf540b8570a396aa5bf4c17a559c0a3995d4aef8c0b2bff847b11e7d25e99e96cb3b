const _excluded = ["effectedByFields", "action"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { checkSchema } from "./checkSchema";
import { MESSAGE, NODE_HANDLERS } from "./constant";
import { getItems, isEffectedValue } from "./utils";
export class BaseReader {
  // The current data of the form
  // Develop custom interpretation rules for various situations
  // After the rule is set, the interpretation can be started
  constructor(schema, data, extra) {
    this.data = {};
    this.schema = void 0;
    this.rulesHandler = void 0;
    this.isReady = false;
    this.extra = {};

    if (!schema) {
      throw Error(MESSAGE.SCHEMA_SHOULD_NOT_BE_EMPTY);
    }

    this.extra = extra;
    this.schema = schema;
    this.data = data;
    this.rulesHandler = {};
  }

  updateSchema(schema) {
    this.schema = schema;
  }

  updateData(data) {
    this.data = data;
  }

  registReadRoot(callback) {
    this.rulesHandler[NODE_HANDLERS.READ_ROOT] = callback;
    return {
      registReadForm: this.registReadForm.bind(this)
    };
  }

  registReadForm(callback) {
    this.rulesHandler[NODE_HANDLERS.READ_FORM] = callback;
    return {
      registReadChild: this.registReadChild.bind(this)
    };
  }

  registReadChild(callback) {
    this.rulesHandler[NODE_HANDLERS.READ_CHILD] = callback;
    return {
      registReadAsValue: this.registReadAsValue.bind(this)
    };
  }

  registReadAsValue(callback) {
    this.rulesHandler[NODE_HANDLERS.READ_AS_VALUE] = callback;
    return {
      registReadCoexitRelation: this.registReadCoexitRelation.bind(this)
    };
  }

  registReadCoexitRelation(callback) {
    this.rulesHandler[NODE_HANDLERS.READ_COEXIT_RELATION] = callback;
    return {
      registerReadNoneItem: this.registerReadNoneItem.bind(this)
    };
  }

  registerReadNoneItem(callback) {
    this.rulesHandler[NODE_HANDLERS.READ_NONE_ITEM] = callback;
    return {
      registReadMutualexclusionRelation: this.registReadMutualexclusionRelation.bind(this)
    };
  }

  registReadMutualexclusionRelation(callback) {
    this.rulesHandler[NODE_HANDLERS.READ_MUTUALEXCLUSION_RELATION] = callback;
    this.setReady();
  }

  setReady() {
    this.isReady = true;
  }

  runHandler(handlerName, result) {
    if (this.rulesHandler[handlerName]) {
      return this.rulesHandler[handlerName](result);
    }

    return result;
  } // 表单里的 true 和 false 字符串处理成布尔值


  filterBoolean(data) {
    if (typeof data === 'object') {
      const keys = Object.keys(data);

      for (const key of keys) {
        if (data[key] === 'true') {
          data[key] = true;
        }

        if (data[key] === 'false') {
          data[key] = false;
        }
      }
    }

    return data;
  }

  getSchemaType(schema) {
    if (!schema.type) {
      return [];
    }

    return schema.type;
  } // Get the initial default value of the field in the schema, only the field value in the UI displayed in the initialization


  getInitValues(schema) {
    const initValues = {};

    const readDefaultValue = (_schema, brothers, isRoot) => {
      if (_schema.type) {
        initValues[_schema.key] = this.getSchemaDefaultValue(_schema, brothers, isRoot);
      }

      if (_schema.items) {
        const items = getItems(_schema, this.data, this.extra);
        items.forEach(each => readDefaultValue(each, items.map(x => x.key), false));
      }
    };

    readDefaultValue(schema, [], true);
    return this.filterBoolean(initValues);
  } // Get the default value of the current shema


  getSchemaDefaultValue(schema, brothers, isRoot) {
    const {
      state
    } = schema;

    if (typeof state === 'object') {
      // Processing linkage
      const handleEffects = val => {
        if (!isEffectedValue(val)) {
          // Return without existence
          return val;
        }

        const _ref = val,
              {
          effectedByFields = [],
          action
        } = _ref,
              rest = _objectWithoutProperties(_ref, _excluded);

        if (isRoot) {
          // If there is no upper level, there is no linkage, return value options other than linkage
          throw Error(`[${schema.key}] top level should not have effects`); // return rest;
        } // There is an upper level, it is judged whether the key of the current linkage is at the same level, and the keys that are not at the same level are not linked.
        // not including myself


        const curNodeEffectedByFields = effectedByFields.filter(x => x !== schema.key);

        if (curNodeEffectedByFields.length === 0) {
          // There is no linkage, no linkage related content is returned
          return rest;
        } // Return the related linkage of the key at the same level


        return _objectSpread({
          effectedByFields: curNodeEffectedByFields,
          action
        }, rest);
      };

      return handleEffects(state.value);
    }

    return state;
  }

  read() {
    if (!this.schema) {
      return null;
    }

    if (!this.isReady) {
      throw Error('you should finished setting rules');
    }

    checkSchema(this.schema, this.extra);
    return this.runHandler(NODE_HANDLERS.READ_ROOT, {
      schema: this.schema,
      result: this.doRead(this.schema, true)
    });
  }

  readObj(schema) {
    const children = [];

    for (const item of getItems(schema, this.data, this.extra)) {
      if (item.items) {
        children.push(this.doRead(item));
      } else if (this.isNoneItem(item)) {
        children.push(this.runHandler(NODE_HANDLERS.READ_NONE_ITEM, item));
      } else {
        children.push(this.runHandler(NODE_HANDLERS.READ_AS_VALUE, item));
      }
    }

    return children;
  }

  readRelation(schema) {
    if (schema.coexit) {
      return this.runHandler(NODE_HANDLERS.READ_COEXIT_RELATION, {
        parent: schema,
        doRead: this.doRead.bind(this)
      });
    }

    if (schema.mutualExclusion) {
      return this.runHandler(NODE_HANDLERS.READ_MUTUALEXCLUSION_RELATION, {
        parent: schema,
        doRead: this.doRead.bind(this)
      });
    }

    throw new Error(MESSAGE.SHOULD_HAS_RELATION(''));
  }

  isNoneItem(schema) {
    if (!schema.type) {
      return false;
    }

    return schema.type.length > 0 && schema.type[0] === 'none';
  }

  doRead(schema, root) {
    let result = null;

    if (!schema.items) {
      if (this.isNoneItem(schema)) {
        result = this.runHandler(NODE_HANDLERS.READ_NONE_ITEM, schema);
      } else {
        result = this.runHandler(NODE_HANDLERS.READ_AS_VALUE, schema);
      }
    } else if (schema.isObject) {
      result = this.readObj(schema);

      if (root) {
        return this.runHandler(NODE_HANDLERS.READ_FORM, {
          schema,
          result
        });
      } else {
        return this.runHandler(NODE_HANDLERS.READ_CHILD, {
          schema,
          result
        });
      }
    } else if (schema.coexit || schema.mutualExclusion) {
      result = this.readRelation(schema);
    }

    return result;
  }

}