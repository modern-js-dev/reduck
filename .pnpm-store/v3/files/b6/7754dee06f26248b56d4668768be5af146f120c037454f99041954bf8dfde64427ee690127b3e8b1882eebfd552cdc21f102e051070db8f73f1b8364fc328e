// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
import { chalk } from '@modern-js/utils';
import { ILogger, LevelPriority, LoggerLevel } from './constants';

export class Logger implements ILogger {
  level: LoggerLevel = LoggerLevel.Info;

  constructor(level: LoggerLevel = LoggerLevel.Info) {
    this.level = level;
  }

  get currentLevelIndex() {
    return LevelPriority.indexOf(this.level);
  }

  private getLevalIndex(level: LoggerLevel) {
    return LevelPriority.indexOf(level);
  }

  error(...meta: any[]) {
    if (this.currentLevelIndex < this.getLevalIndex(LoggerLevel.Error)) {
      return;
    }
    console.log(chalk.red('[ERROR]'), ...meta);
  }

  warn(...meta: any[]) {
    if (this.currentLevelIndex < this.getLevalIndex(LoggerLevel.Warn)) {
      return;
    }
    console.log(chalk.yellow('[WARN]'), ...meta);
  }

  info(...meta: any[]) {
    if (this.currentLevelIndex < this.getLevalIndex(LoggerLevel.Info)) {
      return;
    }
    console.log(chalk.green('[INFO]'), ...meta);
  }

  debug(...meta: any[]) {
    if (this.currentLevelIndex < this.getLevalIndex(LoggerLevel.Debug)) {
      return;
    }
    console.log(chalk.blue('[DEBUG]'), ...meta);
  }

  verbose(...meta: any[]) {
    if (this.currentLevelIndex < this.getLevalIndex(LoggerLevel.Verbose)) {
      return;
    }
    console.log('[VERBOSE]', ...meta);
  }

  stream(...meta: any[]) {
    if (this.currentLevelIndex < this.getLevalIndex(LoggerLevel.Stream)) {
      return;
    }
    console.log('[STREAM]', ...meta);
  }
}
