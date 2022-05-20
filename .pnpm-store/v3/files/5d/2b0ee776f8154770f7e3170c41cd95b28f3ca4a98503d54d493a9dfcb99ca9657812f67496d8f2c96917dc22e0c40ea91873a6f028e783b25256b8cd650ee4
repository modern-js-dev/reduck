import { ILogger, LoggerLevel } from './constants';
export declare class Logger implements ILogger {
  level: LoggerLevel;
  constructor(level?: LoggerLevel);
  get currentLevelIndex(): number;
  private getLevalIndex;
  error(...meta: any[]): void;
  warn(...meta: any[]): void;
  info(...meta: any[]): void;
  debug(...meta: any[]): void;
  verbose(...meta: any[]): void;
  stream(...meta: any[]): void;
}