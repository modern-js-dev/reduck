function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Only elements of a unified level can be linked, and parent and child nodes are not allowed to be linked
 * Link yourself, not allowed
 */
import { isEffectedValue } from "../utils";
import { Graph } from "./graph";
import { isEmptyObject } from "./types"; // Circulation linkage of processing nodes

var CycleEffectError = /*#__PURE__*/function (_Error) {
  _inherits(CycleEffectError, _Error);

  var _super = _createSuper(CycleEffectError);

  function CycleEffectError(graph) {
    var _this;

    _classCallCheck(this, CycleEffectError);

    _this = _super.call(this, 'cyclic effect between nodes');
    _this.message = graph.toString();
    return _this;
  }

  return _createClass(CycleEffectError);
}( /*#__PURE__*/_wrapNativeSuper(Error));

/**
 * Detect the cycle situation, if it occurs, an error will be reported
 */
export var EffectUtil = /*#__PURE__*/function () {
  // checkcycle does not use this graph, because the node will be deleted for loop verification.
  function EffectUtil(data) {
    var _this2 = this;

    _classCallCheck(this, EffectUtil);

    this.effectData = void 0;
    this.graph = void 0;

    this.getInitEffectedValue = function () {
      var result = {};

      var roots = _this2.graph.roots('incoming'); // Get unaffected initial value


      roots.forEach(function (root) {
        result[root.data.key] = root.data.value;
      });
      return _objectSpread(_objectSpread({}, result), _this2.doGetEffectedValue(result, roots));
    };

    this.getEffectedValue = function (value, formData // The latest value of the current form
    ) {
      var keys = Object.keys(value); // Current node as root node

      var rootNodes = _this2.graph.getNodesByKeys(keys);

      return _this2.doGetEffectedValue(_objectSpread(_objectSpread({}, formData), value), rootNodes);
    };

    this.doGetEffectedValue = function (formData, rootNodes) {
      var result = {};

      var doGetEffectedValue = function doGetEffectedValue(node) {
        var toNodes = node.outgoing;

        if (!isEmptyObject(toNodes)) {
          var toNodesKeys = Object.keys(toNodes);

          for (var _i = 0, _toNodesKeys = toNodesKeys; _i < _toNodesKeys.length; _i++) {
            var each = _toNodesKeys[_i];
            var _ref = toNodes[each],
                val = _ref.data.value;

            if (val && isEffectedValue(val)) {
              result[each] = val.action(formData, formData[each]);
              doGetEffectedValue(toNodes[each]);
            }
          }
        }

        return result;
      };

      rootNodes.forEach(function (x) {
        return doGetEffectedValue(x);
      });
      return result;
    };

    this.buildGraph = function (nodeKeys) {
      var graph = new Graph(function (_data) {
        return _data.key;
      });

      if (!nodeKeys.length) {
        return graph;
      }

      var stack = [nodeKeys.pop()];
      var cycleCount = 0;
      var maxCycleCount = Object.keys(_this2.effectData).length - 1;

      while (stack.length) {
        var nodeKey = stack.pop();

        var node = _this2.getEffectInfo(_this2.effectData, nodeKey);

        graph.lookupOrInsertNode(node);

        if (cycleCount++ > maxCycleCount) {
          console.error('max cycle count');
          throw new CycleEffectError(graph);
        }

        if (isEffectedValue(node.value)) {
          var _ref2 = node.value,
              effectedByFields = _ref2.effectedByFields;

          var _iterator = _createForOfIteratorHelper(effectedByFields),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var field = _step.value;

              var fromNode = _this2.getEffectInfo(_this2.effectData, field);

              graph.insertEdge(fromNode, node);
              stack.push(field);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }

        if (stack.length === 0 && nodeKeys.length) {
          cycleCount = 0;
          stack.push(nodeKeys.pop());
        }
      }

      return graph;
    };

    this.effectData = data; // Graph of full data

    this.graph = this.buildGraph(Object.keys(this.effectData)); // Build a graph of all data - Object.keys(this.effectData)

    this.checkCycle();
  } // When initializing, get the initial default value


  _createClass(EffectUtil, [{
    key: "getNodeData",
    value: function getNodeData(nodeKeys) {
      var _this3 = this;

      var result = {};
      nodeKeys.forEach(function (x) {
        result[x] = _this3.effectData[x];
      });
      return result;
    }
  }, {
    key: "checkCycle",
    value: function checkCycle() {
      var graph = this.buildGraph(Object.keys(this.effectData));

      while (true) {
        var roots = graph.roots('incoming');

        if (roots.length === 0) {
          if (!graph.isEmpty()) {
            throw new CycleEffectError(graph);
          }

          break;
        }

        var _iterator2 = _createForOfIteratorHelper(roots),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var root = _step2.value;
            graph.removeNode(root.data);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
  }, {
    key: "getEffectInfo",
    value: function getEffectInfo(data, key) {
      return {
        key: key,
        value: data[key]
      };
    }
  }]);

  return EffectUtil;
}();