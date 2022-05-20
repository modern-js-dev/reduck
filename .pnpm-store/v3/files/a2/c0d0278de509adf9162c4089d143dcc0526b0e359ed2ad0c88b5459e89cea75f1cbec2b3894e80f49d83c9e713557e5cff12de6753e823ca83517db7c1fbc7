import * as S from './schema';
import { TypeOf, Schema, SchemaTypeOf } from './schema';
import { Result, Err } from './result';
export declare type ValidationError = {
    path?: (string | number)[];
    message: string;
};
export declare type ValidationResult<T = any> = Result<T, ValidationError>;
export declare const SchemaErr: (message: string, path?: ValidationError['path']) => Err<ValidationError>;
export declare type ValidatorOptions = {
    strict?: boolean;
};
export declare type Validator<T = any> = (input: unknown, options?: ValidatorOptions) => ValidationResult<T>;
export declare type ValidatorMethods<T extends Schema = Schema> = {
    validate: Validator<TypeOf<T>>;
};
export declare type ValidatorImpl<T extends Schema = Schema> = ValidatorMethods<T> | ((schema: T) => ValidatorMethods<T>);
export declare const Validator: {
    impl<T extends S.Schema>(Ctor: abstract new () => T, impl: ValidatorImpl<T>): void;
    get<T_1 extends S.SchemaCtor<S.Schema>>(Ctor: T_1): ValidatorMethods<S.SchemaTypeOf<T_1>> | undefined;
    validate<T_2 extends S.SchemaCtor<S.Schema>>(Ctor: T_2, input: unknown, options?: ValidatorOptions | undefined): ValidationResult<S.TypeOf<T_2>>;
};
export declare const createSchemaValidator: <S extends S.SchemaCtor<S.Schema>>(SchemaCtor: S, options?: ValidatorOptions | undefined) => (input: unknown) => ValidationResult<S.TypeOf<S>>;
export declare abstract class ValidatorType<T = unknown> extends S.Schema {
    __type: T;
    abstract validate(input: unknown): ValidationResult<T>;
    Ok(value: T): ValidationResult<T>;
    Err(...args: Parameters<typeof SchemaErr>): ValidationResult<T>;
}
export declare const RegExp: (regexp: RegExp) => {
    new (): {
        validate(input: unknown): ValidationResult<string>;
        __type: string;
        Ok(value: string): ValidationResult<string>;
        Err(message: string, path?: (string | number)[] | undefined): ValidationResult<string>;
    };
    create<T extends S.SchemaCtor<S.Schema>>(this: T, value: S.TypeOf<T>): S.TypeOf<T>;
    displayName?: string | undefined;
};
