"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectUtil = void 0;

var _utils = require("../utils");

var _graph = require("./graph");

var _types = require("./types");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Circulation linkage of processing nodes
class CycleEffectError extends Error {
  constructor(graph) {
    super('cyclic effect between nodes');
    this.message = graph.toString();
  }

}

/**
 * Detect the cycle situation, if it occurs, an error will be reported
 */
class EffectUtil {
  // checkcycle does not use this graph, because the node will be deleted for loop verification.
  constructor(data) {
    this.effectData = void 0;
    this.graph = void 0;

    this.getInitEffectedValue = () => {
      const result = {};
      const roots = this.graph.roots('incoming'); // Get unaffected initial value

      roots.forEach(root => {
        result[root.data.key] = root.data.value;
      });
      return _objectSpread(_objectSpread({}, result), this.doGetEffectedValue(result, roots));
    };

    this.getEffectedValue = (value, formData // The latest value of the current form
    ) => {
      const keys = Object.keys(value); // Current node as root node

      const rootNodes = this.graph.getNodesByKeys(keys);
      return this.doGetEffectedValue(_objectSpread(_objectSpread({}, formData), value), rootNodes);
    };

    this.doGetEffectedValue = (formData, rootNodes) => {
      const result = {};

      const doGetEffectedValue = node => {
        const toNodes = node.outgoing;

        if (!(0, _types.isEmptyObject)(toNodes)) {
          const toNodesKeys = Object.keys(toNodes);

          for (const each of toNodesKeys) {
            const {
              data: {
                value: val
              }
            } = toNodes[each];

            if (val && (0, _utils.isEffectedValue)(val)) {
              result[each] = val.action(formData, formData[each]);
              doGetEffectedValue(toNodes[each]);
            }
          }
        }

        return result;
      };

      rootNodes.forEach(x => doGetEffectedValue(x));
      return result;
    };

    this.buildGraph = nodeKeys => {
      const graph = new _graph.Graph(_data => _data.key);

      if (!nodeKeys.length) {
        return graph;
      }

      const stack = [nodeKeys.pop()];
      let cycleCount = 0;
      const maxCycleCount = Object.keys(this.effectData).length - 1;

      while (stack.length) {
        const nodeKey = stack.pop();
        const node = this.getEffectInfo(this.effectData, nodeKey);
        graph.lookupOrInsertNode(node);

        if (cycleCount++ > maxCycleCount) {
          console.error('max cycle count');
          throw new CycleEffectError(graph);
        }

        if ((0, _utils.isEffectedValue)(node.value)) {
          const {
            effectedByFields
          } = node.value;

          for (const field of effectedByFields) {
            const fromNode = this.getEffectInfo(this.effectData, field);
            graph.insertEdge(fromNode, node);
            stack.push(field);
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


  getNodeData(nodeKeys) {
    const result = {};
    nodeKeys.forEach(x => {
      result[x] = this.effectData[x];
    });
    return result;
  }

  checkCycle() {
    const graph = this.buildGraph(Object.keys(this.effectData));

    while (true) {
      const roots = graph.roots('incoming');

      if (roots.length === 0) {
        if (!graph.isEmpty()) {
          throw new CycleEffectError(graph);
        }

        break;
      }

      for (const root of roots) {
        graph.removeNode(root.data);
      }
    }
  }

  getEffectInfo(data, key) {
    return {
      key,
      value: data[key]
    };
  }

}

exports.EffectUtil = EffectUtil;