import { forEach } from './collections';
import { isEmptyObject } from './types';

export interface Node<T> {
  data: T;
  incoming: { [key: string]: Node<T> };
  outgoing: { [key: string]: Node<T> };
}

function newNode<T>(data: T): Node<T> {
  return {
    data,
    incoming: Object.create(null),
    outgoing: Object.create(null),
  };
}

export class Graph<T> {
  private _nodes: { [key: string]: Node<T> } = Object.create(null);

  private readonly getKey: (element: T) => string;

  constructor(getKey: (element: T) => string) {
    this.getKey = getKey;
  }

  roots(by: 'incoming' | 'outgoing'): Array<Node<T>> {
    const ret: Array<Node<T>> = [];
    // Here root means that according to the value of by, for example: incoming, all nodes that do not point to incoming but only outgoing
    // There can be multiple such nodes
    forEach<Node<T>>(this._nodes, entry => {
      if (isEmptyObject(entry.value[by])) {
        ret.push(entry.value);
      }
    });
    return ret;
  }

  lookupOrInsertNode(data: T): Node<T> {
    const key = this.getKey(data);
    let node = this._nodes[key];
    if (!node) {
      node = newNode(data);
      this._nodes[key] = node;
    }
    return node;
  }

  isEmpty(): boolean {
    for (const _key in this._nodes) {
      return false;
    }
    return true;
  }

  getNodesByKeys(keys: string[]) {
    return keys.map(x => this._nodes[x]).filter(x => Boolean(x));
  }

  lookup(data: T): Node<T> {
    return this._nodes[this.getKey(data)];
  }

  removeNode(data: T): void {
    const key = this.getKey(data);
    delete this._nodes[key];
    forEach<Node<T>>(this._nodes, entry => {
      delete entry.value.outgoing[key];
      delete entry.value.incoming[key];
    });
  }

  insertEdge(from: T, to: T): void {
    const fromNode = this.lookupOrInsertNode(from);
    const toNode = this.lookupOrInsertNode(to);

    fromNode.outgoing[this.getKey(to)] = toNode;
    toNode.incoming[this.getKey(from)] = fromNode;
  }

  toString(): string {
    const data: string[] = [];
    forEach<Node<T>>(this._nodes, entry => {
      data.push(
        `${entry.key}, (incoming)[${Object.keys(entry.value.incoming).join(
          ', ',
        )}], (outgoing)[${Object.keys(entry.value.outgoing).join(',')}]`,
      );
    });
    return data.join('\n');
  }

  printGraph() {
    // eslint-disable-next-line no-console
    console.log('graph:', this.toString());
  }
}
