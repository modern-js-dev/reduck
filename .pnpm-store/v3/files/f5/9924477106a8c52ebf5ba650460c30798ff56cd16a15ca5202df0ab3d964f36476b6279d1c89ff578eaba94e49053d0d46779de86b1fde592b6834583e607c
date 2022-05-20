import { RouterSchemaDescriptor } from 'farrow-http/dist/router';
import { MarkReadOnlyDeep } from 'farrow-http/dist/types';
import { TypeOfFieldDescriptor, TypeOfFieldDescriptors, FieldDescriptor, FieldDescriptors } from 'farrow-schema';
export declare type RequestBaseSchema = {
  params?: RouterSchemaDescriptor;
  query?: RouterSchemaDescriptor;
  headers?: RouterSchemaDescriptor;
  cookies?: RouterSchemaDescriptor;
};
export declare type RequestDataSchema = {
  data?: RouterSchemaDescriptor;
};
export declare type RequestBodyType = {
  body?: string;
};
export declare type PureRequestFormDataType = {
  formData?: Record<string, any>;
};
export declare type RequestFormDataType = {
  formData?: FormData;
};
export declare type RequestFormUrlencodedType = {
  formUrlencoded?: URLSearchParams | Record<string, string> | string;
};
export declare type PureRequestFormUrlencodedType = {
  formUrlencoded?: Record<string, string>;
};
export declare type RequestExtraType = RequestBodyType & RequestFormDataType & RequestFormUrlencodedType;
export declare type PureRequestExtraType = RequestBodyType & PureRequestFormDataType & PureRequestFormUrlencodedType;
export declare type RequestSchema = RequestBaseSchema & RequestDataSchema;
export declare type TypeOfRequestField<T> = T extends string ? string : T extends FormData ? FormData : T extends FieldDescriptor ? TypeOfFieldDescriptor<T> : T extends FieldDescriptors ? TypeOfFieldDescriptors<T> : never;
export declare type TypeOfRequestDataSchema<T extends RequestDataSchema> = MarkReadOnlyDeep<T extends {
  data: any;
} ? Pick<{ [key in keyof T]: TypeOfRequestField<T[key]> }, 'data'> : RequestExtraType>;
export declare type TypeOfRequestSchema<T extends RequestSchema> = MarkReadOnlyDeep<Omit<{ [key in keyof T]: TypeOfRequestField<T[key]> }, 'data'> & TypeOfRequestDataSchema<T>>;
export declare type PureTypeOfRequestDataSchema<T extends RequestDataSchema> = MarkReadOnlyDeep<T extends {
  data: any;
} ? Pick<{ [key in keyof T]: TypeOfRequestField<T[key]> }, 'data'> : PureRequestExtraType>;
export declare type PureTypeOfRequestSchema<T extends RequestSchema> = MarkReadOnlyDeep<Omit<{ [key in keyof T]: TypeOfRequestField<T[key]> }, 'data'> & PureTypeOfRequestDataSchema<T>>;
export declare type InputType = TypeOfRequestSchema<RequestSchema>;