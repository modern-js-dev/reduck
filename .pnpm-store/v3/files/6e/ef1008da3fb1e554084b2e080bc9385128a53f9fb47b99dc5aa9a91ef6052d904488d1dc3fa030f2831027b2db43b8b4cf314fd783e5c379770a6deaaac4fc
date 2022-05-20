"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unshift = exports.splice = exports.shift = exports.push = exports.pop = exports.filter = exports.concat = void 0;

const push = (state, payload) => state.concat(payload);

exports.push = push;

const pop = state => {
  const newState = [];

  for (let i = 0; i < state.length - 1; i++) {
    newState.push(state[i]);
  }

  return newState;
};

exports.pop = pop;

const shift = state => {
  const newState = [];

  for (let i = 1; i < state.length; i++) {
    newState.push(state[i]);
  }

  return newState;
};

exports.shift = shift;

const unshift = (state, payload) => [payload, ...state];

exports.unshift = unshift;

const concat = (state, payload) => [...state, ...payload];

exports.concat = concat;

const splice = (state, start, deleteCount, ...items) => {
  const newState = state.slice();
  newState.splice(start, deleteCount, ...items);
  return newState;
};

exports.splice = splice;

const filter = (state, filterFn) => {
  const newState = state.filter(filterFn);
  return newState;
};

exports.filter = filter;