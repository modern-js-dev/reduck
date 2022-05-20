declare const push: <T extends any[]>(state: T, payload: T[0]) => any[];
declare const pop: <T extends any[]>(state: T) => any[];
declare const shift: <T extends any[]>(state: T) => any[];
declare const unshift: <T extends any[]>(state: T, payload: T[0]) => T[number][];
declare const concat: <T extends any[]>(state: T, payload: T) => T[number][];
declare const splice: <T extends any[]>(state: T, start: number, deleteCount: number, ...items: T) => any[];
declare const filter: <T extends any[]>(state: T, filterFn: (value: T[0], index: number, array: T[0][]) => boolean) => any[];
declare type ArrayDispatchActions<T extends any[]> = {
  push: (payload: T[0]) => void;
  pop: () => void;
  shift: () => void;
  unshift: (payload: T[0]) => void;
  concat: (payload: T) => void;
  splice: (start: number, deleteCount: number, ...items: T) => void;
  filter: (filterFn: (value: T[0], index: number, array: T[0][]) => boolean) => void;
};
export { push, pop, shift, unshift, concat, splice, filter };
export type { ArrayDispatchActions };