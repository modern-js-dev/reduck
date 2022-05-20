export declare type SchemaEffectedValueType = {
  effectedByFields: string[];
  action: (effectData: Record<string, unknown>, // Linkage related value changes, such as: {a: 3}
  lastValue: any) => any;
};
export declare type SchemaValueType = SchemaEffectedValueType | string | string[] | number | number[] | Record<string, unknown>[] | undefined | Record<string, unknown>;
export declare type StateType = {
  disabled?: boolean | ((data: Record<string, unknown>, extra?: Record<string, unknown>) => boolean);
  default?: boolean;
  required?: boolean;
  value?: SchemaValueType;
  forceAsMenu?: boolean;
  [key: string]: any;
};
export declare type NodeInfo = {
  label: string;
  state?: StateType;
  formState: Record<string, unknown>;
  type?: string[];
  required?: boolean;
  disabled?: boolean;
  desc?: any;
  default?: boolean;
  extra?: Record<string, unknown>;
  id: string;
  when?: (data: Record<string, unknown>, extra?: Record<string, unknown>) => boolean;
  validate?: (value: any, // current value
  data: Record<string, unknown>, extra?: Record<string, unknown>) => {
    success: boolean;
    error?: string;
  } | Promise<{
    success: boolean;
    error?: string;
  }>;
};
export declare type SchemaValidateType = (value: any, // current value
data: Record<string, unknown>, // All answers in the form
extra?: Record<string, unknown>) => {
  success: boolean;
  error?: string;
} | Promise<{
  success: boolean;
  error?: string;
}>;
export interface Schema {
  key: string;
  label?: string | ((data: Record<string, unknown>, extra?: Record<string, unknown>) => string);
  desc?: any;
  items?: Schema[] | ((data: Record<string, unknown>, extra?: Record<string, unknown>) => Schema[]);
  mutualExclusion?: boolean;
  when?: (data: Record<string, unknown>, extra?: Record<string, unknown>) => boolean;
  validate?: SchemaValidateType;
  coexit?: boolean;
  state?: StateType;
  type?: string[];
  isObject?: boolean;
}
export declare type Handler = (...args: any) => any;
export declare type RootHandler = (options: {
  schema: Schema;
  result: any;
}) => any;
export declare type FormHandler = (options: {
  schema: Schema;
  result: any;
}) => any;
export declare type ChildHandler = (options: {
  schema: Schema;
  result: any;
}) => any;
export declare type ValueHandler = (schema: Schema) => any;
export declare type CoexitRelationHandler = (options: {
  parent: Schema;
  doRead: (schema: Schema) => any;
}) => any;
export declare type NoneHandler = (schema: Schema) => any;
export declare type MutualexclusionRelationHandler = (options: {
  parent: Schema;
  doRead: (schema: Schema) => any;
}) => any;