import { TypeOfRouterRequestField } from 'farrow-http/dist/router';
import { SchemaCtorInput } from 'farrow-schema';
import { MaybeAsync } from 'farrow-pipeline';
import { RequestSchema, TypeOfRequestSchema, PureTypeOfRequestSchema } from './request';
import { HandleResult } from './response';
export declare type NormalHandler = (...args: any[]) => any;
export declare type Handler<I, O> = (input: I) => MaybeAsync<O>;
export declare type Schema<Req extends RequestSchema, Res extends SchemaCtorInput> = {
  request: Req;
  response: Res;
  description?: string;
  deprecated?: string;
};
declare const HANDLER_WITH_SCHEMA = "HANDLER_WITH_SCHEMA";
export declare type BaseSchemaHandler<Req extends RequestSchema, Res extends SchemaCtorInput> = ((input: TypeOfRequestSchema<Req>) => Promise<HandleResult<TypeOfRouterRequestField<Res>>>) & {
  schema: Schema<Req, Res>;
  [HANDLER_WITH_SCHEMA]: true;
};
export declare type SchemaHandler<Req extends RequestSchema, Res extends SchemaCtorInput> = ((input: TypeOfRequestSchema<Req>) => Promise<TypeOfRouterRequestField<Res>>) & {
  schema: Schema<Req, Res>;
  [HANDLER_WITH_SCHEMA]: true;
};
export declare const isSchemaHandler: (input: any) => input is SchemaHandler<any, any>;
export declare const isHandler: (input: any) => input is Handler<any, any>;
export declare const baseMatch: <Req extends RequestSchema, Res extends SchemaCtorInput>(schema: Schema<Req, Res>, handler: Handler<import("farrow-http/dist/types").MarkReadOnlyDeep<Omit<{ [key in keyof Req]: import("./request").TypeOfRequestField<Req[key]> }, "data"> & import("farrow-http/dist/types").MarkReadOnlyDeep<Req extends {
  data: any;
} ? Pick<{ [key_1 in keyof Req]: import("./request").TypeOfRequestField<Req[key_1]> }, "data"> : import("./request").RequestExtraType>>, TypeOfRouterRequestField<Res>>) => BaseSchemaHandler<Req, Res>;
export declare const match: <Req extends RequestSchema, Res extends SchemaCtorInput>(schema: Schema<Req, Res>, handler: Handler<PureTypeOfRequestSchema<Req>, TypeOfRouterRequestField<Res>>) => SchemaHandler<Req, Res>;
export {};