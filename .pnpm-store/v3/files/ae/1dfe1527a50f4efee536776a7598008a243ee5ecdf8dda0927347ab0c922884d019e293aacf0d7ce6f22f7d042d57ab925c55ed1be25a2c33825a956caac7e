export type SchemaEffectedValueType = {
  effectedByFields: string[];
  action: (
    effectData: Record<string, unknown>, // Linkage related value changes, such as: {a: 3}
    lastValue: any,
  ) => any;
};
export declare type SchemaValueType =
  | SchemaEffectedValueType
  | string
  | string[]
  | number
  | number[]
  | Record<string, unknown>[]
  | undefined
  | Record<string, unknown>;

export type StateType = {
  disabled?:
    | boolean
    | ((
        data: Record<string, unknown>,
        extra?: Record<string, unknown>,
      ) => boolean);
  default?: boolean;
  required?: boolean;
  value?: SchemaValueType;
  // value?: any | ((data: Record<string, unknown>) => any);
  forceAsMenu?: boolean;
  [key: string]: any;
};

// The basic information of the node that will be passed to all nodes
export type NodeInfo = {
  label: string;
  state?: StateType; // Node remaining state
  formState: Record<string, unknown>; // All data information in the form
  type?: string[];
  required?: boolean;
  disabled?: boolean;
  desc?: any;
  default?: boolean; // Is it by default
  extra?: Record<string, unknown>; // User external parameters
  id: string;
  when?: (
    data: Record<string, unknown>,
    extra?: Record<string, unknown>, // external parameters
  ) => boolean;
  validate?: (
    value: any, // current value
    data: Record<string, unknown>,
    extra?: Record<string, unknown>,
  ) =>
    | {
        success: boolean;
        error?: string;
      }
    | Promise<{
        success: boolean;
        error?: string;
      }>;
};

export type SchemaValidateType = (
  value: any, // current value
  data: Record<string, unknown>, // All answers in the form
  extra?: Record<string, unknown>,
) =>
  | {
      success: boolean;
      error?: string;
    }
  | Promise<{
      success: boolean;
      error?: string;
    }>;

export interface Schema {
  key: string;
  label?:
    | string
    | ((
        data: Record<string, unknown>,
        extra?: Record<string, unknown>,
      ) => string);
  desc?: any;
  items?:
    | Schema[]
    | ((
        data: Record<string, unknown>,
        extra?: Record<string, unknown>,
      ) => Schema[]);
  mutualExclusion?: boolean;
  when?: (
    data: Record<string, unknown>,
    extra?: Record<string, unknown>,
  ) => boolean;
  validate?: SchemaValidateType;
  coexit?: boolean;
  state?: StateType;
  // If none describes non-form element components
  type?: string[]; // string | date | number | map | array | boolean | none
  isObject?: boolean;
}
// baseHandler
export type Handler = (...args: any) => any;
export type RootHandler = (options: { schema: Schema; result: any }) => any;
export type FormHandler = (options: { schema: Schema; result: any }) => any;
export type ChildHandler = (options: { schema: Schema; result: any }) => any;
export type ValueHandler = (schema: Schema) => any;
export type CoexitRelationHandler = (options: {
  parent: Schema;
  doRead: (schema: Schema) => any;
}) => any;

export type NoneHandler = (schema: Schema) => any;

export type MutualexclusionRelationHandler = (options: {
  parent: Schema;
  doRead: (schema: Schema) => any;
}) => any;
