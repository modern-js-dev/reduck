import { Context, Model } from "../types";
declare const createSubscribe: (context: Context, model: Model) => (handler: () => void) => () => void;
declare const combineSubscribe: (context: Context, ...subscribes: ReturnType<typeof createSubscribe>[]) => (handler: () => void) => () => void;
export { createSubscribe, combineSubscribe };