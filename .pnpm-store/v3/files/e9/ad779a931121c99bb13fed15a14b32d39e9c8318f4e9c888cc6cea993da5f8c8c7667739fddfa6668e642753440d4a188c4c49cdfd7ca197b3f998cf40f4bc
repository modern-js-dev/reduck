/**
 * An interface for a JavaScript object that
 * acts a dictionary. The keys are strings.
 */
export interface IStringDictionary<V> {
  [name: string]: V;
}
/**
 * An interface for a JavaScript object that
 * acts a dictionary. The keys are numbers.
 */

export interface INumberDictionary<V> {
  [idx: number]: V;
}
/**
 * Traverse the collection with string or number as key
 * Allow element deletion during traversal
 *
 * @param from - Collection
 * @param callback - Process a single element, when it returns false, stop the traversal
 * @returns
 */

export declare function forEach<T>(from: IStringDictionary<T> | INumberDictionary<T>, callback: (entry: {
  key: any;
  value: T;
}, remove: () => void) => any): void;