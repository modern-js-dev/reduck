import { NextFunction } from '../type';
import { ModernServerContext } from './context';
declare type Rule = {
  path: string | RegExp;
  target: string;
};
export declare const createStaticFileHandler: (rules: Rule[]) => (context: ModernServerContext, next: NextFunction) => Promise<void>;
export {};