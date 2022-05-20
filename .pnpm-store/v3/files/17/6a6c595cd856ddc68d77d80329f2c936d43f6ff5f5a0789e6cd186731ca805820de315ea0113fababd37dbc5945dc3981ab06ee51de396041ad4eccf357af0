/// <reference types="node" />
export declare class LruReader {
  private readonly cache;
  constructor();
  init(): void;
  close(): void;
  read(filepath: string): Promise<{
    content: Buffer;
    mtime: Date;
  } | {
    content: Buffer;
  } | null>;
  update(): void;
}
export declare const readFile: (filepath: string) => Promise<Buffer | undefined>;
export declare const updateFile: () => void;
export declare const init: () => void;
export declare const close: () => void;