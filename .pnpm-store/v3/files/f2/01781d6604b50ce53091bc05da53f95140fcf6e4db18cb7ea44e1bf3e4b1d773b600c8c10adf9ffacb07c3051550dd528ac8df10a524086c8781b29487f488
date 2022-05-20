export declare type MarkReadOnlyDeep<T> = T extends {} | any[] ? {
    readonly [key in keyof T]: MarkReadOnlyDeep<T[key]>;
} : T;
declare type ParseUnion<T extends string> = T extends `${infer Left}|${infer Right}` ? Left | ParseUnion<Right> : T;
declare type ValueTypeMap = {
    string: string;
    number: number;
    boolean: boolean;
    int: number;
    float: number;
    id: string;
};
declare type ParseItem<T extends string> = T extends keyof ValueTypeMap ? ValueTypeMap[T] : T extends `{${infer Literal}}` ? Literal : never;
declare type ParseValue<T extends string> = ParseItem<ParseUnion<T>>;
declare type ParseModifier<Key extends string, Value> = Key extends `${infer K}?` ? {
    [key in K]?: Value;
} : Key extends `${infer K}*` ? {
    [key in K]?: Value[];
} : Key extends `${infer K}+` ? {
    [key in K]: Value[];
} : {
    [key in Key]: Value;
};
declare type ParseDynamic<T extends string> = T extends `${infer _Left}<${infer Key}:${infer Value}>${infer Right}` ? ParseModifier<Key, ParseValue<Value>> & ParseDynamic<Right> : {};
declare type ParseStatic<T extends string> = T extends `${infer Key}=${infer Value}&${infer Right}` ? {
    [key in Key]: Value;
} & ParseStatic<Right> : T extends `${infer _Left}&${infer Right}` ? ParseStatic<Right> : T extends `${infer Key}=${infer Value}` ? {
    [key in Key]: Value;
} : {};
declare type ParseData<T extends string> = ParseDynamic<T> & ParseStatic<T>;
declare type IsNotEmptyObjectKey<T, Key> = T extends object ? (keyof T extends never ? never : Key) : Key;
declare type CleanEmptyObject<T extends object> = {
    [key in keyof T as IsNotEmptyObjectKey<T[key], key>]: T[key];
};
declare type ParsePathname<T extends string> = T extends `${infer Left}?${infer Right}` ? Right extends `:${infer Rest}` ? `${Left}?:${ParsePathname<Rest>}` : Left : T;
declare type ParseQueryString<T extends string> = T extends `${infer _Left}?${infer Right}` ? Right extends `:${infer Rest}` ? ParseQueryString<Rest> : Right : '';
export declare type ParseUrl<T extends string> = CleanEmptyObject<{
    pathname: string;
    params: ParseData<ParsePathname<T>>;
    query: ParseData<ParseQueryString<T>>;
}>;
export {};
