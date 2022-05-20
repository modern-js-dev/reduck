import * as S from './schema';
import { Schema, Literals } from './schema';
export declare type FormatField = {
    typeId: number;
    $ref: string;
    description?: string;
    deprecated?: string;
};
export declare type FormatFields = {
    [key: string]: FormatField;
};
export declare type FormatObjectType = {
    type: 'Object';
    name: string;
    fields: FormatFields;
};
export declare type FormatStructType = {
    type: 'Struct';
    name?: string;
    fields: FormatFields;
};
export declare type FormatScalarType = {
    type: 'Scalar';
    valueType: string;
    valueName: string;
};
export declare type FormatLiteralType = {
    type: 'Literal';
    value: Literals;
};
export declare type FormatRecordType = {
    type: 'Record';
    valueTypeId: number;
    $ref: string;
};
export declare type FormatListType = {
    type: 'List';
    itemTypeId: number;
    $ref: string;
};
export declare type FormatNullableType = {
    type: 'Nullable';
    itemTypeId: number;
    $ref: string;
};
export declare type FormatUnionType = {
    type: 'Union';
    name?: string;
    itemTypes: {
        typeId: number;
        $ref: string;
    }[];
};
export declare type FormatIntersectType = {
    type: 'Intersect';
    name?: string;
    itemTypes: {
        typeId: number;
        $ref: string;
    }[];
};
export declare type FormatTupleType = {
    type: 'Tuple';
    name?: string;
    itemTypes: {
        typeId: number;
        $ref: string;
    }[];
};
export declare type FormatStrictType = {
    type: 'Strict';
    itemTypeId: number;
    $ref: string;
};
export declare type FormatNonStrictType = {
    type: 'NonStrict';
    itemTypeId: number;
    $ref: string;
};
export declare type FormatReadOnlyType = {
    type: 'ReadOnly';
    itemTypeId: number;
    $ref: string;
};
export declare type FormatReadonlyDeepType = {
    type: 'ReadOnlyDeep';
    itemTypeId: number;
    $ref: string;
};
export declare type FormatType = FormatScalarType | FormatObjectType | FormatUnionType | FormatStructType | FormatRecordType | FormatListType | FormatLiteralType | FormatNullableType | FormatIntersectType | FormatTupleType | FormatStrictType | FormatNonStrictType | FormatReadOnlyType | FormatReadonlyDeepType;
export declare type FormatTypes = {
    [key: string]: FormatType;
};
export declare type FormatContext = {
    addType: (type: FormatType) => number;
    formatCache: WeakMap<Function, number>;
};
export declare type FormatterMethods = {
    format(context: FormatContext): number;
};
export declare type FormatterImpl<T extends Schema = Schema> = FormatterMethods | ((schema: T) => FormatterMethods);
export declare type NamedFormatType = FormatTupleType | FormatStructType | FormatUnionType | FormatIntersectType | FormatObjectType;
export declare const isNamedFormatType: (input: FormatType) => input is NamedFormatType;
export declare const Formatter: {
    impl<T extends S.Schema>(Ctor: abstract new () => T, impl: FormatterImpl<T>): void;
    get<T_1 extends S.SchemaCtor<S.Schema>>(Ctor: T_1): FormatterMethods | undefined;
    formatSchema<T_2 extends S.SchemaCtor<S.Schema>>(Ctor: T_2, ctx: FormatContext): number;
    format<T_3 extends S.SchemaCtor<S.Schema>>(Ctor: T_3, context?: FormatContext | undefined): {
        typeId: number;
        types: FormatTypes;
    };
};
export declare const formatSchema: <T extends S.SchemaCtor<S.Schema>>(Ctor: T, context?: FormatContext | undefined) => {
    typeId: number;
    types: FormatTypes;
};
