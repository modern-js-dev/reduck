export declare type HandleSuccess<T> = {
  type: 'HandleSuccess';
  value: T;
};
export declare const HandleSuccess: <T>(output: T) => HandleSuccess<T>;
export declare type InputValidationError = {
  type: 'InputValidationError';
  message: string;
};
export declare const InputValidationError: (message: string) => InputValidationError;
export declare type OutputValidationError = {
  type: 'OutputValidationError';
  message: string;
};
export declare const OutputValidationError: (message: string) => OutputValidationError;
export declare type HandleResult<T> = HandleSuccess<T> | InputValidationError | OutputValidationError;