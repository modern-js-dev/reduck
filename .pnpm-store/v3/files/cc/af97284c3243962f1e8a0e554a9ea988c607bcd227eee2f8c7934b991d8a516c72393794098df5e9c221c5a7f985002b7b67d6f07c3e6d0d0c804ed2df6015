function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

import { forEach } from "./collections";
import { isEmptyObject } from "./types";

function newNode(data) {
  return {
    data: data,
    incoming: Object.create(null),
    outgoing: Object.create(null)
  };
}

export var Graph = /*#__PURE__*/function () {
  function Graph(getKey) {
    _classCallCheck(this, Graph);

    this._nodes = Object.create(null);
    this.getKey = void 0;
    this.getKey = getKey;
  }

  _createClass(Graph, [{
    key: "roots",
    value: function roots(by) {
      var ret = []; // Here root means that according to the value of by, for example: incoming, all nodes that do not point to incoming but only outgoing
      // There can be multiple such nodes

      forEach(this._nodes, function (entry) {
        if (isEmptyObject(entry.value[by])) {
          ret.push(entry.value);
        }
      });
      return ret;
    }
  }, {
    key: "lookupOrInsertNode",
    value: function lookupOrInsertNode(data) {
      var key = this.getKey(data);
      var node = this._nodes[key];

      if (!node) {
        node = newNode(data);
        this._nodes[key] = node;
      }

      return node;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      for (var _key in this._nodes) {
        return false;
      }

      return true;
    }
  }, {
    key: "getNodesByKeys",
    value: function getNodesByKeys(keys) {
      var _this = this;

      return keys.map(function (x) {
        return _this._nodes[x];
      }).filter(function (x) {
        return Boolean(x);
      });
    }
  }, {
    key: "lookup",
    value: function lookup(data) {
      return this._nodes[this.getKey(data)];
    }
  }, {
    key: "removeNode",
    value: function removeNode(data) {
      var key = this.getKey(data);
      delete this._nodes[key];
      forEach(this._nodes, function (entry) {
        delete entry.value.outgoing[key];
        delete entry.value.incoming[key];
      });
    }
  }, {
    key: "insertEdge",
    value: function insertEdge(from, to) {
      var fromNode = this.lookupOrInsertNode(from);
      var toNode = this.lookupOrInsertNode(to);
      fromNode.outgoing[this.getKey(to)] = toNode;
      toNode.incoming[this.getKey(from)] = fromNode;
    }
  }, {
    key: "toString",
    value: function toString() {
      var data = [];
      forEach(this._nodes, function (entry) {
        data.push("".concat(entry.key, ", (incoming)[").concat(Object.keys(entry.value.incoming).join(', '), "], (outgoing)[").concat(Object.keys(entry.value.outgoing).join(','), "]"));
      });
      return data.join('\n');
    }
  }, {
    key: "printGraph",
    value: function printGraph() {
      // eslint-disable-next-line no-console
      console.log('graph:', this.toString());
    }
  }]);

  return Graph;
}();