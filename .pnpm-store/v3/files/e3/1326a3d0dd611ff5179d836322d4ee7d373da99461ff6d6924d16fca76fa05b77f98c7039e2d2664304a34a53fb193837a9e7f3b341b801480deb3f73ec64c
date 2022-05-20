export declare enum LoggerLevel {
  Error = "error",
  Warn = "warn",
  Info = "info",
  Debug = "debug",
  Verbose = "verbose",
  Stream = "stream",
}
export declare const LevelPriority: LoggerLevel[];
declare type LeveledLogMethod = (...meta: any[]) => void;
export interface ILogger {
  level: LoggerLevel;
  [LoggerLevel.Error]: LeveledLogMethod;
  [LoggerLevel.Warn]: LeveledLogMethod;
  [LoggerLevel.Info]: LeveledLogMethod;
  [LoggerLevel.Debug]: LeveledLogMethod;
  [LoggerLevel.Verbose]: LeveledLogMethod;
  [LoggerLevel.Stream]: LeveledLogMethod;
}
export {};