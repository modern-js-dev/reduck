import { ObjectType, StructType, FieldDescriptors, SchemaField, FieldDescriptor, FieldInfo, TypeOf } from './schema';
import * as S from './schema';
export declare const field: <T extends FieldInfo>(fieldInfo: T) => T;
export declare const pickStruct: <T extends StructType, Keys extends (keyof T["descriptors"])[]>(Ctor: new () => T, keys: Keys) => {
    new (): {
        descriptors: Pick<T["descriptors"], Keys[number]>;
        __type: S.ShallowPrettier<S.TypeOfFieldDescriptors<Pick<T["descriptors"], Keys[number]>>>;
    };
    create<T_1 extends S.SchemaCtor<S.Schema>>(this: T_1, value: TypeOf<T_1>): TypeOf<T_1>;
    displayName?: string | undefined;
};
export declare const omitStruct: <T extends StructType, Keys extends (keyof T["descriptors"])[]>(Ctor: new () => T, keys: Keys) => {
    new (): {
        descriptors: Omit<T["descriptors"], Keys[number]>;
        __type: S.ShallowPrettier<S.TypeOfFieldDescriptors<Omit<T["descriptors"], Keys[number]>>>;
    };
    create<T_1 extends S.SchemaCtor<S.Schema>>(this: T_1, value: TypeOf<T_1>): TypeOf<T_1>;
    displayName?: string | undefined;
};
export declare type PickObject<T extends ObjectType, Keys extends SchemaField<T, keyof T>> = {
    [key in keyof T as key extends Keys ? key : never]: T[key] extends FieldDescriptor ? T[key] : never;
};
export declare const pickObject: <T extends ObjectType, Keys extends SchemaField<T, keyof T>[]>(Ctor: new () => T, keys: Keys) => {
    new (): {
        descriptors: PickObject<T, Keys[number]>;
        __type: S.ShallowPrettier<S.TypeOfFieldDescriptors<PickObject<T, Keys[number]>>>;
    };
    create<T_1 extends S.SchemaCtor<S.Schema>>(this: T_1, value: TypeOf<T_1>): TypeOf<T_1>;
    displayName?: string | undefined;
};
export declare type OmitObject<T extends ObjectType, Keys extends SchemaField<T, keyof T>> = {
    [key in keyof T as key extends Keys | '__type' ? never : key]: T[key] extends FieldDescriptor ? T[key] : never;
};
export declare const omitObject: <T extends ObjectType, Keys extends SchemaField<T, keyof T>[]>(Ctor: new () => T, keys: Keys) => {
    new (): {
        descriptors: OmitObject<T, Keys[number]>;
        __type: S.ShallowPrettier<S.TypeOfFieldDescriptors<OmitObject<T, Keys[number]>>>;
    };
    create<T_1 extends S.SchemaCtor<S.Schema>>(this: T_1, value: TypeOf<T_1>): TypeOf<T_1>;
    displayName?: string | undefined;
};
export declare type PickSchema = typeof pickObject & typeof pickStruct;
export declare const pick: PickSchema;
export declare type OmitSchema = typeof omitObject & typeof omitStruct;
export declare const omit: PickSchema;
export declare const keyofStruct: <T extends StructType>(Ctor: new () => T) => (keyof T["descriptors"])[];
export declare const keyofObject: <T extends ObjectType>(Ctor: new () => T) => (keyof TypeOf<T>)[];
export declare type KeyOfSchema = typeof keyofStruct & typeof keyofObject;
export declare const keyof: KeyOfSchema;
export declare type SchemaCtorFields = {
    [key: string]: S.FieldInfo;
};
export declare const getSchemaCtorFields: (descriptors: S.FieldDescriptors) => SchemaCtorFields;
export declare abstract class PartialType extends S.Schema {
    __type: Partial<TypeOf<this['Item']>>;
    abstract Item: S.SchemaCtor;
}
export declare const partialStruct: <T extends StructType>(Ctor: new () => T) => {
    new (): {
        Item: new () => T;
        __type: Partial<new () => T extends new () => {
            __type: infer U;
        } ? U : never>;
    };
    create<T_1 extends S.SchemaCtor<S.Schema>>(this: T_1, value: TypeOf<T_1>): TypeOf<T_1>;
    displayName?: string | undefined;
};
export declare const partialObject: <T extends ObjectType>(Ctor: new () => T) => {
    new (): {
        Item: new () => T;
        __type: Partial<new () => T extends new () => {
            __type: infer U;
        } ? U : never>;
    };
    create<T_1 extends S.SchemaCtor<S.Schema>>(this: T_1, value: TypeOf<T_1>): TypeOf<T_1>;
    displayName?: string | undefined;
};
export declare const partial: typeof partialStruct & typeof partialObject;
