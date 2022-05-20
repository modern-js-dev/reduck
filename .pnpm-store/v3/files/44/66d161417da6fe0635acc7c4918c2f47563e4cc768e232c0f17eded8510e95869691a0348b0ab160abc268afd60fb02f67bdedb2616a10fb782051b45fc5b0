import { forEach } from "./collections";
import { isEmptyObject } from "./types";

function newNode(data) {
  return {
    data,
    incoming: Object.create(null),
    outgoing: Object.create(null)
  };
}

export class Graph {
  constructor(getKey) {
    this._nodes = Object.create(null);
    this.getKey = void 0;
    this.getKey = getKey;
  }

  roots(by) {
    const ret = []; // Here root means that according to the value of by, for example: incoming, all nodes that do not point to incoming but only outgoing
    // There can be multiple such nodes

    forEach(this._nodes, entry => {
      if (isEmptyObject(entry.value[by])) {
        ret.push(entry.value);
      }
    });
    return ret;
  }

  lookupOrInsertNode(data) {
    const key = this.getKey(data);
    let node = this._nodes[key];

    if (!node) {
      node = newNode(data);
      this._nodes[key] = node;
    }

    return node;
  }

  isEmpty() {
    for (const _key in this._nodes) {
      return false;
    }

    return true;
  }

  getNodesByKeys(keys) {
    return keys.map(x => this._nodes[x]).filter(x => Boolean(x));
  }

  lookup(data) {
    return this._nodes[this.getKey(data)];
  }

  removeNode(data) {
    const key = this.getKey(data);
    delete this._nodes[key];
    forEach(this._nodes, entry => {
      delete entry.value.outgoing[key];
      delete entry.value.incoming[key];
    });
  }

  insertEdge(from, to) {
    const fromNode = this.lookupOrInsertNode(from);
    const toNode = this.lookupOrInsertNode(to);
    fromNode.outgoing[this.getKey(to)] = toNode;
    toNode.incoming[this.getKey(from)] = fromNode;
  }

  toString() {
    const data = [];
    forEach(this._nodes, entry => {
      data.push(`${entry.key}, (incoming)[${Object.keys(entry.value.incoming).join(', ')}], (outgoing)[${Object.keys(entry.value.outgoing).join(',')}]`);
    });
    return data.join('\n');
  }

  printGraph() {
    // eslint-disable-next-line no-console
    console.log('graph:', this.toString());
  }

}