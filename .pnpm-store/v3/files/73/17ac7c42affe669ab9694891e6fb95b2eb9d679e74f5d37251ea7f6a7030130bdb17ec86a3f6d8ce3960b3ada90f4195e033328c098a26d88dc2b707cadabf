declare type ObjectDispatchActions<T extends Record<string, any>> = { [key in string & keyof T as `set${Capitalize<key>}`]: (payload: T[key]) => void };
declare const createObjectActions: (state: any) => Record<string, any>;
export { createObjectActions };
export type { ObjectDispatchActions };