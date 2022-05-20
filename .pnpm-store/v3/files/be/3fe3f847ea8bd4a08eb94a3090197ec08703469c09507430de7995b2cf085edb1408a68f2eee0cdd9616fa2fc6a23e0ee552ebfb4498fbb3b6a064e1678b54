"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ok = exports.Err = void 0;

// eslint-disable-next-line @typescript-eslint/no-redeclare
const Err = value => {
  const err = {
    kind: 'Err',
    value,
    isErr: true,
    isOk: false
  };
  return err;
}; // eslint-disable-next-line @typescript-eslint/no-redeclare


exports.Err = Err;

const Ok = value => {
  const ok = {
    kind: 'Ok',
    value,
    isErr: false,
    isOk: true
  };
  return ok;
};

exports.Ok = Ok;