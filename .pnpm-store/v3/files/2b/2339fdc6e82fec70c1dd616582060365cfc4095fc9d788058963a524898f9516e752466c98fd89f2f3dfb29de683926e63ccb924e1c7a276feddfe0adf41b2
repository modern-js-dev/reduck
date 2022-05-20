/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
import { ModernServerContext, NextFunction } from '@modern-js/types';
export declare type MockConfig = Record<string, {
  data: any;
} | ((req: IncomingMessage, res: ServerResponse, next: NextFunction) => Promise<void>)>;
export declare type MockApi = {
  method: string;
  path: string;
  handler: ReturnType<typeof createFunctionDataHandler | typeof createStaticDataHandler>;
};
declare const createFunctionDataHandler: (method: string, handler: (req: IncomingMessage, res: ServerResponse, next: NextFunction) => void) => (context: ModernServerContext, next: NextFunction) => Promise<void>;
declare const createStaticDataHandler: (method: string, handler: Record<string, any>) => (context: ModernServerContext) => void;

declare const _default: (filepath: string) => MockApi[];

export default _default;
export declare const getMatched: (context: ModernServerContext, mockApiList: MockApi[]) => MockApi | undefined;