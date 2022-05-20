var _excluded = ["effectedByFields", "action"];

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

import { checkSchema } from "./checkSchema";
import { MESSAGE, NODE_HANDLERS } from "./constant";
import { getItems, isEffectedValue } from "./utils";
export var BaseReader = /*#__PURE__*/function () {
  // The current data of the form
  // Develop custom interpretation rules for various situations
  // After the rule is set, the interpretation can be started
  function BaseReader(schema, data, extra) {
    _classCallCheck(this, BaseReader);

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

  _createClass(BaseReader, [{
    key: "updateSchema",
    value: function updateSchema(schema) {
      this.schema = schema;
    }
  }, {
    key: "updateData",
    value: function updateData(data) {
      this.data = data;
    }
  }, {
    key: "registReadRoot",
    value: function registReadRoot(callback) {
      this.rulesHandler[NODE_HANDLERS.READ_ROOT] = callback;
      return {
        registReadForm: this.registReadForm.bind(this)
      };
    }
  }, {
    key: "registReadForm",
    value: function registReadForm(callback) {
      this.rulesHandler[NODE_HANDLERS.READ_FORM] = callback;
      return {
        registReadChild: this.registReadChild.bind(this)
      };
    }
  }, {
    key: "registReadChild",
    value: function registReadChild(callback) {
      this.rulesHandler[NODE_HANDLERS.READ_CHILD] = callback;
      return {
        registReadAsValue: this.registReadAsValue.bind(this)
      };
    }
  }, {
    key: "registReadAsValue",
    value: function registReadAsValue(callback) {
      this.rulesHandler[NODE_HANDLERS.READ_AS_VALUE] = callback;
      return {
        registReadCoexitRelation: this.registReadCoexitRelation.bind(this)
      };
    }
  }, {
    key: "registReadCoexitRelation",
    value: function registReadCoexitRelation(callback) {
      this.rulesHandler[NODE_HANDLERS.READ_COEXIT_RELATION] = callback;
      return {
        registerReadNoneItem: this.registerReadNoneItem.bind(this)
      };
    }
  }, {
    key: "registerReadNoneItem",
    value: function registerReadNoneItem(callback) {
      this.rulesHandler[NODE_HANDLERS.READ_NONE_ITEM] = callback;
      return {
        registReadMutualexclusionRelation: this.registReadMutualexclusionRelation.bind(this)
      };
    }
  }, {
    key: "registReadMutualexclusionRelation",
    value: function registReadMutualexclusionRelation(callback) {
      this.rulesHandler[NODE_HANDLERS.READ_MUTUALEXCLUSION_RELATION] = callback;
      this.setReady();
    }
  }, {
    key: "setReady",
    value: function setReady() {
      this.isReady = true;
    }
  }, {
    key: "runHandler",
    value: function runHandler(handlerName, result) {
      if (this.rulesHandler[handlerName]) {
        return this.rulesHandler[handlerName](result);
      }

      return result;
    } // 表单里的 true 和 false 字符串处理成布尔值

  }, {
    key: "filterBoolean",
    value: function filterBoolean(data) {
      if (_typeof(data) === 'object') {
        var keys = Object.keys(data);

        for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
          var _key = _keys[_i];

          if (data[_key] === 'true') {
            data[_key] = true;
          }

          if (data[_key] === 'false') {
            data[_key] = false;
          }
        }
      }

      return data;
    }
  }, {
    key: "getSchemaType",
    value: function getSchemaType(schema) {
      if (!schema.type) {
        return [];
      }

      return schema.type;
    } // Get the initial default value of the field in the schema, only the field value in the UI displayed in the initialization

  }, {
    key: "getInitValues",
    value: function getInitValues(schema) {
      var _this = this;

      var initValues = {};

      var readDefaultValue = function readDefaultValue(_schema, brothers, isRoot) {
        if (_schema.type) {
          initValues[_schema.key] = _this.getSchemaDefaultValue(_schema, brothers, isRoot);
        }

        if (_schema.items) {
          var items = getItems(_schema, _this.data, _this.extra);
          items.forEach(function (each) {
            return readDefaultValue(each, items.map(function (x) {
              return x.key;
            }), false);
          });
        }
      };

      readDefaultValue(schema, [], true);
      return this.filterBoolean(initValues);
    } // Get the default value of the current shema

  }, {
    key: "getSchemaDefaultValue",
    value: function getSchemaDefaultValue(schema, brothers, isRoot) {
      var state = schema.state;

      if (_typeof(state) === 'object') {
        // Processing linkage
        var handleEffects = function handleEffects(val) {
          if (!isEffectedValue(val)) {
            // Return without existence
            return val;
          }

          var _ref = val,
              _ref$effectedByFields = _ref.effectedByFields,
              effectedByFields = _ref$effectedByFields === void 0 ? [] : _ref$effectedByFields,
              action = _ref.action,
              rest = _objectWithoutProperties(_ref, _excluded);

          if (isRoot) {
            // If there is no upper level, there is no linkage, return value options other than linkage
            throw Error("[".concat(schema.key, "] top level should not have effects")); // return rest;
          } // There is an upper level, it is judged whether the key of the current linkage is at the same level, and the keys that are not at the same level are not linked.
          // not including myself


          var curNodeEffectedByFields = effectedByFields.filter(function (x) {
            return x !== schema.key;
          });

          if (curNodeEffectedByFields.length === 0) {
            // There is no linkage, no linkage related content is returned
            return rest;
          } // Return the related linkage of the key at the same level


          return _objectSpread({
            effectedByFields: curNodeEffectedByFields,
            action: action
          }, rest);
        };

        return handleEffects(state.value);
      }

      return state;
    }
  }, {
    key: "read",
    value: function read() {
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
  }, {
    key: "readObj",
    value: function readObj(schema) {
      var children = [];

      var _iterator = _createForOfIteratorHelper(getItems(schema, this.data, this.extra)),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;

          if (item.items) {
            children.push(this.doRead(item));
          } else if (this.isNoneItem(item)) {
            children.push(this.runHandler(NODE_HANDLERS.READ_NONE_ITEM, item));
          } else {
            children.push(this.runHandler(NODE_HANDLERS.READ_AS_VALUE, item));
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return children;
    }
  }, {
    key: "readRelation",
    value: function readRelation(schema) {
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
  }, {
    key: "isNoneItem",
    value: function isNoneItem(schema) {
      if (!schema.type) {
        return false;
      }

      return schema.type.length > 0 && schema.type[0] === 'none';
    }
  }, {
    key: "doRead",
    value: function doRead(schema, root) {
      var result = null;

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
            schema: schema,
            result: result
          });
        } else {
          return this.runHandler(NODE_HANDLERS.READ_CHILD, {
            schema: schema,
            result: result
          });
        }
      } else if (schema.coexit || schema.mutualExclusion) {
        result = this.readRelation(schema);
      }

      return result;
    }
  }]);

  return BaseReader;
}();