import { Path as Pathname } from 'path-to-regexp';
import { MiddlewareInput, Pipeline, AsyncPipeline, Middleware } from 'farrow-pipeline';
import * as Schema from 'farrow-schema';
import type { ValidationError } from 'farrow-schema/validator';
import { Validator } from 'farrow-schema/validator';
import { MaybeAsyncResponse, Response } from './response';
import type { RequestInfo } from './requestInfo';
import type { BodyMap } from './responseInfo';
import type { MarkReadOnlyDeep, ParseUrl } from './types';
export { Pathname };
export declare type RouterSchemaDescriptor = Schema.FieldDescriptors | (new () => Schema.ObjectType) | (new () => Schema.StructType);
export declare type RouterSharedSchema = {
    method?: string | string[];
    body?: Schema.FieldDescriptor | Schema.FieldDescriptors;
    headers?: RouterSchemaDescriptor;
    cookies?: RouterSchemaDescriptor;
};
export declare type RouterRequestSchema = {
    pathname: Pathname;
    params?: RouterSchemaDescriptor;
    query?: RouterSchemaDescriptor;
} & RouterSharedSchema;
export declare type RouterUrlSchema<T extends string = string> = {
    url: T;
} & RouterSharedSchema;
export declare const isRouterRequestSchema: (input: any) => input is RouterRequestSchema;
export declare const isRouterUrlSchema: (input: any) => input is RouterUrlSchema<string>;
export declare type TypeOfRouterRequestField<T> = T extends string | string[] ? string : T extends Pathname ? string : T extends Schema.FieldDescriptor ? Schema.TypeOfFieldDescriptor<T> : T extends Schema.FieldDescriptors ? Schema.TypeOfFieldDescriptors<T> : never;
export declare type TypeOfRequestSchema<T extends RouterRequestSchema> = MarkReadOnlyDeep<{
    [key in keyof T]: TypeOfRouterRequestField<T[key]>;
}>;
export declare type TypeOfUrlSchema<T extends RouterUrlSchema> = MarkReadOnlyDeep<ParseUrl<T['url']> & {
    [key in keyof Omit<T, 'url'>]: TypeOfRouterRequestField<Omit<T, 'url'>[key]>;
}>;
export declare type HttpMiddleware = Middleware<RequestInfo, MaybeAsyncResponse>;
export declare type HttpMiddlewareInput = MiddlewareInput<RequestInfo, MaybeAsyncResponse>;
export declare type MatchOptions = {
    block?: boolean;
    onSchemaError?(error: ValidationError): Response | void;
};
export declare type RouterSchema = RouterRequestSchema | RouterUrlSchema;
export declare type RouterSchemaValidator<T extends RouterSchema> = T extends RouterRequestSchema ? Validator<TypeOfRequestSchema<T>> : T extends RouterUrlSchema ? Validator<TypeOfUrlSchema<T>> : never;
export declare type MatchedPipeline<T extends RouterSchema> = T extends RouterRequestSchema ? Pipeline<TypeOfRequestSchema<T>, MaybeAsyncResponse> : T extends RouterUrlSchema ? Pipeline<TypeOfUrlSchema<T>, MaybeAsyncResponse> : never;
export declare type RouterPipeline = AsyncPipeline<RequestInfo, Response> & {
    capture: <T extends keyof BodyMap>(type: T, f: (body: BodyMap[T]) => MaybeAsyncResponse) => void;
    route: (name: string) => Pipeline<RequestInfo, MaybeAsyncResponse>;
    serve: (name: string, dirname: string) => void;
    match<T extends RouterRequestSchema>(schema: T, options?: MatchOptions): Pipeline<TypeOfRequestSchema<T>, MaybeAsyncResponse>;
    match<U extends string, T extends RouterUrlSchema<U>>(schema: T, options?: MatchOptions): Pipeline<TypeOfUrlSchema<T>, MaybeAsyncResponse>;
} & RoutingMethods;
export declare type RoutingMethod = <U extends string, T extends RouterSharedSchema>(path: U, schema?: T, options?: MatchOptions) => Pipeline<MarkReadOnlyDeep<TypeOfUrlSchema<{
    url: U;
    method: string;
} & (RouterSharedSchema extends T ? {} : T)>>, MaybeAsyncResponse>;
export declare type RoutingMethods = {
    get: RoutingMethod;
    post: RoutingMethod;
    put: RoutingMethod;
    head: RoutingMethod;
    delete: RoutingMethod;
    patch: RoutingMethod;
    options: RoutingMethod;
};
export declare type RouterPipelineOptions = string;
export declare const createRouterPipeline: () => RouterPipeline;
export declare const Router: () => RouterPipeline;
