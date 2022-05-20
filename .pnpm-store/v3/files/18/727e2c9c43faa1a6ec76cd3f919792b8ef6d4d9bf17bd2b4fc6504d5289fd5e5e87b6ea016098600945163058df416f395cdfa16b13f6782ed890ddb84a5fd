import { Type, Prettier, TypeOf, ToSchemaCtor, SchemaCtorInput, JsonType } from 'farrow-schema';
import { AsyncPipeline, MaybeAsync } from 'farrow-pipeline';
export type { JsonType };
export declare type Typeable<T = unknown> = T | {
    [Type]: T;
    description?: string;
    deprecated?: string;
};
declare type TypeableContentType<T extends Typeable> = T extends Typeable<infer U> ? U : never;
export declare const getContentType: <T extends unknown>(typeable: T) => TypeableContentType<T>;
export declare const getTypeDescription: (typeable: Typeable<any>) => string | undefined;
export declare const getTypeDeprecated: (typeable: Typeable<any>) => string | undefined;
export declare type ApiDefinition<Input extends SchemaCtorInput = any, Output extends SchemaCtorInput = any> = {
    /**
     * input schema of api
     */
    input: Typeable<Input>;
    /**
     * output schema of api
     */
    output: Typeable<Output>;
    /**
     * description of api
     */
    description?: string;
    /**
     * depcreated info of api if needed
     */
    deprecated?: string;
};
export declare type TypeOfTypeable<T extends Typeable<SchemaCtorInput>> = Prettier<TypeOf<ToSchemaCtor<TypeableContentType<T>>>>;
export declare type ApiImpl<T extends ApiDefinition> = (input: TypeOfTypeable<T['input']>) => MaybeAsync<TypeOfTypeable<T['output']>>;
export declare type ApiPipeline<T extends ApiDefinition = ApiDefinition> = AsyncPipeline<TypeOfTypeable<T['input']>, TypeOfTypeable<T['output']>>;
export declare type ApiSchema<T extends ApiDefinition = ApiDefinition> = {
    type: 'Api';
    definition: T;
};
export declare type ApiMethods<T extends ApiDefinition = ApiDefinition> = {
    new: () => ApiType<T>;
};
export declare type ApiType<T extends ApiDefinition = ApiDefinition> = ApiImpl<T> & ApiSchema<T> & ApiPipeline<T> & ApiMethods<T>;
export declare const isApi: <T extends ApiDefinition<any, any> = ApiDefinition<any, any>>(input: any) => input is ApiType<T>;
export declare function createApi<T extends ApiDefinition>(definition: T, impl?: ApiImpl<T>): ApiType<T>;
export declare const Api: typeof createApi;
export declare type ApiEntries = {
    [key: string]: ApiType | ApiEntries;
};
