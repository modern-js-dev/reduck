import { toSchemaCtor, Struct, NonStrict } from 'farrow-schema';
import { createSchemaValidator } from 'farrow-schema/validator';
import { HandleSuccess, InputValidationError, OutputValidationError } from "./response";

const getErrorMessage = error => {
  let {
    message
  } = error;

  if (Array.isArray(error.path) && error.path.length > 0) {
    message = `path: ${JSON.stringify(error.path)}\n${message}`;
  }

  return message;
};

const HANDLER_WITH_SCHEMA = 'HANDLER_WITH_SCHEMA';
export const isSchemaHandler = input => input && (input === null || input === void 0 ? void 0 : input[HANDLER_WITH_SCHEMA]) === true;
export const isHandler = input => input && typeof input === 'function';
export const baseMatch = (schema, handler) => {
  const validateApiInput = createRequestSchemaValidator(schema.request);
  const validateApiOutput = createSchemaValidator(toSchemaCtor(schema.response));

  const handle = async input => {
    const inputResult = validateApiInput(input);

    if (inputResult.isErr) {
      return InputValidationError(getErrorMessage(inputResult.value));
    }

    const output = await handler(input);
    const outputResult = validateApiOutput(output);

    if (outputResult.isErr) {
      return OutputValidationError(getErrorMessage(outputResult.value));
    }

    return HandleSuccess(output);
  };

  return Object.assign(handle, {
    schema,
    [HANDLER_WITH_SCHEMA]: true
  });
};
export const match = baseMatch;

const createRequestSchemaValidator = schema => {
  const descriptors = {};

  if (schema.params) {
    descriptors.params = schema.params;
  }

  if (schema.query) {
    descriptors.query = schema.query;
  }

  if (schema.data) {
    descriptors.data = schema.data;
  }

  if (schema.headers) {
    descriptors.headers = schema.headers;
  }

  if (schema.cookies) {
    descriptors.cookies = schema.cookies;
  }

  const RequestStruct = Struct(descriptors);
  return createSchemaValidator(NonStrict(RequestStruct));
};