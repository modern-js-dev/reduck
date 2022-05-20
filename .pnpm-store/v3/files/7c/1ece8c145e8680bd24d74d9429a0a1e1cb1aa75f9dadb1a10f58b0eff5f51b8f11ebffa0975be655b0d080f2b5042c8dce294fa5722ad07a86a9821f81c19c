import type { AsyncWorker, AsyncWorkers } from './async';
import type { RunWorkflowOptions } from './sync';
declare const PARALLEL_WORKFLOW_SYMBOL: unique symbol;
export declare type ParallelWorkflow<I, O = any> = {
  run: (input: I, options?: RunWorkflowOptions) => Promise<O[]>;
  use: (...I: AsyncWorkers<I, O>) => ParallelWorkflow<I, O>;
  [PARALLEL_WORKFLOW_SYMBOL]: true;
};
export declare type ParallelWorkflow2Worker<W extends ParallelWorkflow<any>> = W extends ParallelWorkflow<infer CS, infer O> ? AsyncWorker<CS, O> : never;
export declare type ParallelWorkflowRecord = Record<string, ParallelWorkflow<any>>;
export declare type ParallelWorkflows2Workers<PS extends ParallelWorkflowRecord | void> = { [K in keyof PS]: PS[K] extends ParallelWorkflow<any> ? ParallelWorkflow2Worker<PS[K]> : PS[K] extends void ? void : never };
export declare type ParallelWorkflows2AsyncWorkers<PS extends ParallelWorkflowRecord | void> = { [K in keyof PS]: PS[K] extends ParallelWorkflow<any> ? ParallelWorkflow2Worker<PS[K]> : PS[K] extends void ? void : never };
export declare type RunnerFromParallelWorkflow<W extends ParallelWorkflow<any>> = W extends ParallelWorkflow<infer CS, infer O> ? ParallelWorkflow<CS, O>['run'] : never;
export declare type ParallelWorkflows2Runners<PS extends ParallelWorkflowRecord | void> = { [K in keyof PS]: PS[K] extends ParallelWorkflow<any> ? RunnerFromParallelWorkflow<PS[K]> : PS[K] extends void ? void : never };
export declare const isParallelWorkflow: (input: any) => input is ParallelWorkflow<any, any>;
export declare const createParallelWorkflow: <I = void, O = unknown>() => ParallelWorkflow<I, O>;
export {};