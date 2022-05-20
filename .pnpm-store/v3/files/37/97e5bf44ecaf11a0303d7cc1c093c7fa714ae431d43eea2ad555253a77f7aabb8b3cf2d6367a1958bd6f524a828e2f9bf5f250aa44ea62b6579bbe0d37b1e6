function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { getItems } from "./itemsField";
import { setSchemaInitValue } from "./stateField"; // Foreach with key chain

export var forEachWithKeyChain = function forEachWithKeyChain(schema, handler) {
  var doForeach = function doForeach(_schema, keyChain) {
    var result = handler({
      schema: _schema,
      keyChain: keyChain,
      defaultHandlers: {
        setSchemaInitValue: setSchemaInitValue
      }
    });

    if (result === false) {
      return;
    }

    if (_schema.items) {
      getItems(_schema).forEach(function (each) {
        return doForeach(each, keyChain ? "".concat(keyChain, ".").concat(_schema.key) : _schema.key);
      });
    }
  };

  doForeach(schema, '');
  return schema;
};
export var forEach = function forEach(schema, handler // Return true to terminate the loop
) {
  var doForeach = function doForeach(_schema) {
    var result = handler(_schema, {
      setSchemaInitValue: setSchemaInitValue
    });

    if (result === false) {
      return;
    }

    if (_schema.items) {
      getItems(_schema).forEach(function (each) {
        return doForeach(each);
      });
    }
  };

  doForeach(schema);
  return schema;
}; // Filter out values of type none

export var filterNone = function filterNone(schema, originData) {
  var needKeys = [];

  var isNone = function isNone(obj) {
    if (!obj.type) {
      return false;
    }

    return obj.type.includes('none');
  };

  var doSchema = function doSchema(_schema) {
    if (_schema.isObject) {
      _schema.items.forEach(function (each) {
        doSchema(each);
      });
    } else if ((_schema.mutualExclusion || _schema.coexit) && _schema.type) {
      if (!isNone(_schema)) {
        needKeys.push(_schema.key);
      }

      _schema.items.forEach(function (each) {
        doSchema(each);
      });
    } else if (_schema.type) {
      if (!isNone(_schema)) {
        needKeys.push(_schema.key);
      }
    }
  };

  doSchema(schema);
  var result = {};

  for (var _i = 0, _needKeys = needKeys; _i < _needKeys.length; _i++) {
    var key = _needKeys[_i];
    result[key] = originData[key];
  }

  return result;
};
export var filter = function filter(schema, originData) {
  var needKeys = [];

  var findItem = function findItem(key, _schema) {
    var tmp = _schema;

    if (tmp.key === key.toString()) {
      return tmp;
    }

    if (!tmp.items) {
      return null;
    }

    var target = null;

    var _iterator = _createForOfIteratorHelper(tmp.items),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        target = findItem(key, item);

        if (target) {
          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return target;
  };

  var doSchema = function doSchema(_schema) {
    var isNone = function isNone(obj) {
      if (!obj.type) {
        return false;
      }

      return obj.type.includes('none');
    };

    if (_schema.isObject) {
      _schema.items.forEach(function (each) {
        doSchema(each);
      });
    } else if (_schema.mutualExclusion && _schema.type) {
      // The root node is a selection type, then the value of its selection is the key of an option in its child element
      var choosedKey = originData[_schema.key];
      var targetItem = findItem(choosedKey, _schema);

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
  var result = {};

  for (var _i2 = 0, _needKeys2 = needKeys; _i2 < _needKeys2.length; _i2++) {
    var key = _needKeys2[_i2];
    result[key] = originData[key];
  }

  return result;
};