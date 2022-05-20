"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.match = exports.isSchemaHandler = exports.isHandler = exports.baseMatch = void 0;

var _farrowSchema = require("farrow-schema");

var _validator = require("farrow-schema/validator");

var _response = require("./response");

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

const isSchemaHandler = input => input && (input === null || input === void 0 ? void 0 : input[HANDLER_WITH_SCHEMA]) === true;

exports.isSchemaHandler = isSchemaHandler;

const isHandler = input => input && typeof input === 'function';

exports.isHandler = isHandler;

const baseMatch = (schema, handler) => {
  const validateApiInput = createRequestSchemaValidator(schema.request);
  const validateApiOutput = (0, _validator.createSchemaValidator)((0, _farrowSchema.toSchemaCtor)(schema.response));

  const handle = async input => {
    const inputResult = validateApiInput(input);

    if (inputResult.isErr) {
      return (0, _response.InputValidationError)(getErrorMessage(inputResult.value));
    }

    const output = await handler(input);
    const outputResult = validateApiOutput(output);

    if (outputResult.isErr) {
      return (0, _response.OutputValidationError)(getErrorMessage(outputResult.value));
    }

    return (0, _response.HandleSuccess)(output);
  };

  return Object.assign(handle, {
    schema,
    [HANDLER_WITH_SCHEMA]: true
  });
};

exports.baseMatch = baseMatch;
const match = baseMatch;
exports.match = match;

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

  const RequestStruct = (0, _farrowSchema.Struct)(descriptors);
  return (0, _validator.createSchemaValidator)((0, _farrowSchema.NonStrict)(RequestStruct));
};