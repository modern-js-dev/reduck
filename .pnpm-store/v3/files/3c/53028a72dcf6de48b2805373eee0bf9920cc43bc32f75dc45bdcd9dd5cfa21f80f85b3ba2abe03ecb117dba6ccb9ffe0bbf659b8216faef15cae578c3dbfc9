"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutputValidationError = exports.InputValidationError = exports.HandleSuccess = void 0;

// eslint-disable-next-line @typescript-eslint/no-redeclare
const HandleSuccess = output => ({
  type: 'HandleSuccess',
  value: output
});

exports.HandleSuccess = HandleSuccess;

// eslint-disable-next-line @typescript-eslint/no-redeclare
const InputValidationError = message => ({
  type: 'InputValidationError',
  message
});

exports.InputValidationError = InputValidationError;

// eslint-disable-next-line @typescript-eslint/no-redeclare
const OutputValidationError = message => ({
  type: 'OutputValidationError',
  message
});

exports.OutputValidationError = OutputValidationError;