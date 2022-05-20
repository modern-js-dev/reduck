import { Schema } from '../types';
import { setSchemaInitValue } from './stateField';
export declare const forEachWithKeyChain: (schema: Schema, handler: (options: {
  schema: Schema;
  keyChain: string;
  defaultHandlers: {
    setSchemaInitValue: typeof setSchemaInitValue;
  };
}) => boolean | undefined) => Schema;
export declare const forEach: (schema: Schema, handler: (schema: Schema, defaultHandlers: {
  setSchemaInitValue: typeof setSchemaInitValue;
}) => boolean | undefined | void) => Schema;
export declare const filterNone: (schema: Schema, originData: any) => any;
export declare const filter: (schema: Schema, originData: any) => any;