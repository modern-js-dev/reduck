export interface Node<T> {
  data: T;
  incoming: {
    [key: string]: Node<T>;
  };
  outgoing: {
    [key: string]: Node<T>;
  };
}
export declare class Graph<T> {
  private _nodes;
  private readonly getKey;
  constructor(getKey: (element: T) => string);
  roots(by: 'incoming' | 'outgoing'): Array<Node<T>>;
  lookupOrInsertNode(data: T): Node<T>;
  isEmpty(): boolean;
  getNodesByKeys(keys: string[]): Node<T>[];
  lookup(data: T): Node<T>;
  removeNode(data: T): void;
  insertEdge(from: T, to: T): void;
  toString(): string;
  printGraph(): void;
}