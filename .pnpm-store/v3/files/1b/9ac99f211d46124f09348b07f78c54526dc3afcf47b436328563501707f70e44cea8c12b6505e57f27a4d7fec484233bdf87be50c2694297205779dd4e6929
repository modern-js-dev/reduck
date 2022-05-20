import type { DateInstanceType, MarkReadOnlyDeep } from './types';
export declare type Prettier<T> = T extends Promise<infer U> ? Promise<Prettier<U>> : T extends (...args: infer Args) => infer Return ? (...args: Prettier<Args>) => Prettier<Return> : T extends object | any[] ? {
    [key in keyof T]: Prettier<T[key]>;
} : T;
export declare type ShallowPrettier<T> = T extends object | any[] ? {
    [key in keyof T]: T[key];
} : T;
export declare abstract class Schema {
    static create<T extends SchemaCtor>(this: T, value: TypeOf<T>): TypeOf<T>;
    static displayName?: string;
    abstract __type: unknown;
}
export declare type Primitives = NumberConstructor | StringConstructor | BooleanConstructor | DateConstructor;
export declare type SchemaCtor<T extends Schema = Schema> = Primitives | (new () => T);
export declare type TypeOf<T extends SchemaCtor | Schema> = T extends DateConstructor ? DateInstanceType : T extends Primitives ? ReturnType<T> : T extends new () => {
    __type: infer U;
} ? U : T extends Schema ? T['__type'] : never;
export declare class Number extends Schema {
    __type: number;
}
export declare class String extends Schema {
    __type: string;
}
export declare class Boolean extends Schema {
    __type: boolean;
}
export declare class ID extends Schema {
    __type: string;
}
export declare class Int extends Schema {
    __type: number;
}
export declare class Float extends Schema {
    __type: number;
}
export declare class Date extends Schema {
    __type: DateInstanceType;
}
export declare abstract class ListType extends Schema {
    __type: TypeOf<this['Item']>[];
    abstract Item: SchemaCtor;
}
export declare const List: <T extends SchemaCtorInput>(Item: T) => {
    new (): {
        Item: ToSchemaCtor<T>;
        __type: TypeOf<ToSchemaCtor<T>>[];
    };
    create<T_1 extends SchemaCtor<Schema>>(this: T_1, value: TypeOf<T_1>): TypeOf<T_1>;
    displayName?: string | undefined;
};
export declare type SchemaField<T extends object, key extends keyof T> = key extends '__type' ? never : T[key] extends undefined ? never : T[key] extends SchemaCtorInput | FieldInfo | undefined ? key : never;
export declare type TypeOfField<T> = T extends FieldInfo ? TypeOf<T['__type']> : T extends SchemaCtorInput ? TypeOfSchemaCtorInput<T> : T extends undefined ? undefined : never;
export declare abstract class ObjectType extends Schema {
    __type: {
        [key in keyof this as SchemaField<this, key>]: TypeOfField<this[key]>;
    };
}
export declare abstract class UnionType extends Schema {
    __type: TypeOf<this['Items'][number]>;
    abstract Items: SchemaCtor[];
}
export declare const Union: <T extends SchemaCtorInput[]>(...Items: T) => {
    new (): {
        Items: ToSchemaCtors<T>;
        __type: TypeOf<ToSchemaCtors<T>[number]>;
    };
    create<T_1 extends SchemaCtor<Schema>>(this: T_1, value: TypeOf<T_1>): TypeOf<T_1>;
    displayName?: string | undefined;
};
export declare type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;
export declare type TypeOfIntersect<T extends SchemaCtor[]> = UnionToIntersection<TypeOf<T[number]>>;
export declare abstract class IntersectType extends Schema {
    __type: TypeOfIntersect<this['Items']>;
    abstract Items: SchemaCtor[];
}
export declare const Intersect: <T extends SchemaCtorInput[]>(...Items: T) => {
    new (): {
        Items: ToSchemaCtors<T>;
        __type: UnionToIntersection<TypeOf<ToSchemaCtors<T>[number]>>;
    };
    create<T_1 extends SchemaCtor<Schema>>(this: T_1, value: TypeOf<T_1>): TypeOf<T_1>;
    displayName?: string | undefined;
};
export declare type Literals = number | string | boolean | null | undefined;
export declare abstract class LiteralType extends Schema {
    __type: this['value'];
    abstract value: Literals;
}
export declare const Literal: <T extends Literals>(value: T) => {
    new (): {
        value: T;
        __type: T;
    };
    create<T_1 extends SchemaCtor<Schema>>(this: T_1, value: TypeOf<T_1>): TypeOf<T_1>;
    displayName?: string | undefined;
};
export declare const Null: {
    new (): {
        value: null;
        __type: null;
    };
    create<T extends SchemaCtor<Schema>>(this: T, value: TypeOf<T>): TypeOf<T>;
    displayName?: string | undefined;
};
export declare const Undefined: {
    new (): {
        value: undefined;
        __type: undefined;
    };
    create<T extends SchemaCtor<Schema>>(this: T, value: TypeOf<T>): TypeOf<T>;
    displayName?: string | undefined;
};
export declare abstract class NullableType extends Schema {
    __type: TypeOf<this['Item']> | null | undefined;
    abstract Item: SchemaCtor;
}
export declare const isNullableType: (input: any) => input is new () => NullableType;
export declare const Nullable: <T extends SchemaCtorInput>(Item: T) => {
    new (): {
        Item: ToSchemaCtor<T>;
        __type: TypeOf<ToSchemaCtor<T>> | null | undefined;
    };
    create<T_1 extends SchemaCtor<Schema>>(this: T_1, value: TypeOf<T_1>): TypeOf<T_1>;
    displayName?: string | undefined;
};
export declare const Type: "__type";
export declare type FieldInfo = {
    __type: SchemaCtor;
    description?: string;
    deprecated?: string;
};
export declare type FieldDescriptor = SchemaCtor | FieldInfo;
export declare type FieldDescriptors = {
    [key: string]: FieldDescriptor | FieldDescriptors;
};
export declare type TypeOfFieldDescriptor<T extends FieldDescriptor> = T extends SchemaCtor ? TypeOf<T> : T extends FieldInfo ? TypeOf<T['__type']> : never;
export declare type TypeOfFieldDescriptors<T extends FieldDescriptors> = {
    [key in keyof T]: T[key] extends FieldDescriptor ? TypeOfFieldDescriptor<T[key]> : T[key] extends FieldDescriptors ? ShallowPrettier<TypeOfFieldDescriptors<T[key]>> : never;
};
export declare abstract class StructType extends Schema {
    __type: ShallowPrettier<TypeOfFieldDescriptors<this['descriptors']>>;
    abstract descriptors: FieldDescriptors;
}
export declare const Struct: <T extends FieldDescriptors>(descriptors: T) => {
    new (): {
        descriptors: T;
        __type: ShallowPrettier<TypeOfFieldDescriptors<T>>;
    };
    create<T_1 extends SchemaCtor<Schema>>(this: T_1, value: TypeOf<T_1>): TypeOf<T_1>;
    displayName?: string | undefined;
};
export declare type TypeOfRecord<T extends SchemaCtor> = {
    [key: string]: TypeOf<T>;
};
export declare abstract class RecordType extends Schema {
    __type: TypeOfRecord<this['Item']>;
    abstract Item: SchemaCtor;
}
export declare const Record: <T extends SchemaCtorInput>(Item: T) => {
    new (): {
        Item: ToSchemaCtor<T>;
        __type: TypeOfRecord<ToSchemaCtor<T>>;
    };
    create<T_1 extends SchemaCtor<Schema>>(this: T_1, value: TypeOf<T_1>): TypeOf<T_1>;
    displayName?: string | undefined;
};
export declare class Any extends Schema {
    __type: any;
}
export declare class Unknown extends Schema {
    __type: unknown;
}
export declare class Never extends Schema {
    __type: never;
}
export declare type JsonType = number | string | boolean | null | undefined | JsonType[] | {
    toJSON(): string;
} | {
    [key: string]: JsonType;
};
export declare class Json extends Schema {
    __type: JsonType;
}
export declare abstract class StrictType extends Schema {
    __type: TypeOf<this['Item']>;
    abstract Item: SchemaCtor;
}
export declare const Strict: <T extends SchemaCtorInput>(Item: T) => {
    new (): {
        Item: ToSchemaCtor<T>;
        __type: TypeOf<ToSchemaCtor<T>>;
    };
    create<T_1 extends SchemaCtor<Schema>>(this: T_1, value: TypeOf<T_1>): TypeOf<T_1>;
    displayName?: string | undefined;
};
export declare abstract class NonStrictType extends Schema {
    __type: TypeOf<this['Item']>;
    abstract Item: SchemaCtor;
}
export declare const NonStrict: <T extends SchemaCtorInput>(Item: T) => {
    new (): {
        Item: ToSchemaCtor<T>;
        __type: TypeOf<ToSchemaCtor<T>>;
    };
    create<T_1 extends SchemaCtor<Schema>>(this: T_1, value: TypeOf<T_1>): TypeOf<T_1>;
    displayName?: string | undefined;
};
export declare abstract class ReadOnlyType extends Schema {
    __type: Readonly<TypeOf<this['Item']>>;
    abstract Item: SchemaCtor;
}
export declare const ReadOnly: <T extends SchemaCtorInput>(Item: T) => {
    new (): {
        Item: ToSchemaCtor<T>;
        __type: Readonly<TypeOf<ToSchemaCtor<T>>>;
    };
    create<T_1 extends SchemaCtor<Schema>>(this: T_1, value: TypeOf<T_1>): TypeOf<T_1>;
    displayName?: string | undefined;
};
export declare abstract class ReadOnlyDeepType extends Schema {
    __type: MarkReadOnlyDeep<TypeOf<this['Item']>>;
    abstract Item: SchemaCtor;
}
export declare const ReadOnlyDeep: <T extends SchemaCtorInput>(Item: T) => {
    new (): {
        Item: ToSchemaCtor<T>;
        __type: MarkReadOnlyDeep<TypeOf<ToSchemaCtor<T>>>;
    };
    create<T_1 extends SchemaCtor<Schema>>(this: T_1, value: TypeOf<T_1>): TypeOf<T_1>;
    displayName?: string | undefined;
};
export declare type SchemaTypeOf<T extends SchemaCtor> = T extends NumberConstructor ? Number : T extends StringConstructor ? String : T extends BooleanConstructor ? Boolean : T extends DateConstructor ? Date : T extends new () => infer S ? S : never;
export declare const getSchemaCtor: <T extends SchemaCtor<Schema>>(Ctor: T) => SchemaTypeOf<T>;
export declare const isSchemaCtor: (input: any) => input is SchemaCtor<Schema>;
export declare const isFieldDescriptor: (input: any) => input is FieldDescriptor;
export declare const isFieldDescriptors: (input: any) => input is FieldDescriptors;
export declare type SchemaCtorInput = SchemaCtor | FieldDescriptors;
export declare type TypeOfSchemaCtorInput<T extends SchemaCtor | FieldDescriptors> = T extends SchemaCtor ? TypeOf<T> : T extends FieldDescriptors ? TypeOfFieldDescriptors<T> : never;
export declare type ToSchemaCtor<T extends SchemaCtorInput> = T extends SchemaCtor ? T : T extends FieldDescriptors ? new () => {
    __type: TypeOfFieldDescriptors<T>;
} : never;
export declare type SchemaCtorInputs = SchemaCtorInput[] | {
    [key: string]: SchemaCtorInput;
};
export declare type ToSchemaCtors<T extends SchemaCtorInputs> = {
    [key in keyof T]: T[key] extends SchemaCtorInput ? ToSchemaCtor<T[key]> : never;
};
export declare const toSchemaCtor: <T extends SchemaCtorInput>(Item: T) => ToSchemaCtor<T>;
export declare const toSchemaCtors: <T extends SchemaCtorInputs>(Inputs: T) => ToSchemaCtors<T>;
export declare type InstanceTypeOf<T extends SchemaCtor> = T extends NumberConstructor ? Number : T extends StringConstructor ? String : T extends BooleanConstructor ? Boolean : T extends DateConstructor ? Date : T extends new () => infer R ? R : never;
export declare const getInstance: <T extends SchemaCtor<Schema>>(Ctor: T) => InstanceTypeOf<T>;
export declare type TypeOfTuple<T> = T extends [] ? [] : T extends [SchemaCtor, ...infer Rest] ? [TypeOf<T[0]>, ...TypeOfTuple<Rest>] : [];
export declare abstract class TupleType extends Schema {
    __type: TypeOfTuple<this['Items']>;
    abstract Items: SchemaCtor[];
}
export declare const Tuple: <T extends SchemaCtorInput[]>(...Items: T) => {
    new (): {
        Items: ToSchemaCtors<T>;
        __type: TypeOfTuple<ToSchemaCtors<T>>;
    };
    create<T_1 extends SchemaCtor<Schema>>(this: T_1, value: TypeOf<T_1>): TypeOf<T_1>;
    displayName?: string | undefined;
};
