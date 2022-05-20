"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RUN_MODE = exports.ERROR_PAGE_TEXT = exports.ERROR_DIGEST = exports.ApiServerMode = exports.AGGRED_DIR = void 0;
const AGGRED_DIR = {
  mock: 'config/mock',
  server: 'server',
  api: 'api',
  shared: 'shared',
  lambda: 'lambda'
};
exports.AGGRED_DIR = AGGRED_DIR;
let ApiServerMode;
exports.ApiServerMode = ApiServerMode;

(function (ApiServerMode) {
  ApiServerMode["func"] = "function";
  ApiServerMode["frame"] = "framework";
})(ApiServerMode || (exports.ApiServerMode = ApiServerMode = {}));

const ERROR_DIGEST = {
  INIT: 'Server init error',
  ENOTF: 'Page could not be found',
  WARMUP: 'SSR warmup failed',
  EINTER: 'Internal server error',
  ERENDER: 'SSR render failed',
  EMICROINJ: 'Get micro-frontend info failed'
};
exports.ERROR_DIGEST = ERROR_DIGEST;
const ERROR_PAGE_TEXT = {
  404: 'This page could not be found.',
  500: 'Internal Server Error.'
};
exports.ERROR_PAGE_TEXT = ERROR_PAGE_TEXT;
const RUN_MODE = {
  FULL: 'full',
  TYPE: 'type'
};
exports.RUN_MODE = RUN_MODE;