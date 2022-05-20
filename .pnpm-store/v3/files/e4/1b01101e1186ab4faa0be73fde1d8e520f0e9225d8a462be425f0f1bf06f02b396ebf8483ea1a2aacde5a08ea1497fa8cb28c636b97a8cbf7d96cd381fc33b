import type { Entrypoint } from '@modern-js/types';
import type { ImportStatement } from './generateCode';
export declare const walkDirectory: (dir: string) => string[];
export declare const getDefaultImports: ({
  entrypoint,
  srcDirectory,
  internalSrcAlias,
  internalDirAlias
}: {
  entrypoint: Entrypoint;
  srcDirectory: string;
  internalSrcAlias: string;
  internalDirAlias: string;
}) => ImportStatement[];
export declare const isRouteComponentFile: (filePath: string) => boolean;