/// <reference types="node" />
import { Server } from 'http';
import ws from 'ws';
import type { Stats } from 'webpack';
import { DevServerOptions } from '../types';
export default class SocketServer {
  private wsServer;
  private readonly sockets;
  private readonly options;
  private app?;
  private stats?;
  private timer;
  constructor(options: DevServerOptions);
  prepare(app: Server): void;
  updateStats(stats: Stats): void;
  sockWrite(type: string, data?: Record<string, any> | string | boolean): void;
  singleWrite(socket: ws, type: string, data?: Record<string, any> | string | boolean): void;
  close(): void;
  private onConnect;
  private getStats;
  private sendStats;
  private send;
}